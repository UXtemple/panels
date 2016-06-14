import getApp from './apps/get';
import getContextAndFocus from './router/navigate';
import getRegions from './runtime/get-regions';
import normaliseUri from 'panels-normalise-uri';
import parseUri from './router/parse';

function ensurePanelShape(panel) {
  if (typeof panel.width === 'undefined') {
    panel.width = 360;
  }
}

export const NAVIGATE = 'panels/NAVIGATE';
export function navigate(rawUri, nextFocus = 1, nextContext) {
  return async function navigateThunk(dispatch, getState) {
    const { apps, panels, router, runtime } = getState();

    const uri = normaliseUri(rawUri);
    if (uri === router.uri) {
      return;
    }

    console.time('parse');
    const parsed = parseUri(uri);
    console.timeEnd('parse');

    console.time('apps');
    const appContext = {
      navigate(uri, focus, context) {
        dispatch(navigate(uri, focus, context))
      }
    };

    // get the next apps
    const nextApps = {
      byName: {},
      items: parsed.apps.items.filter(name => apps.items.indexOf(name) === -1)
    };

    if (nextApps.items.length) {
      dispatch({
        type: NAVIGATE,
        sequence: {
          type: 'start'
        },
        meta: {
          uri
        }
      });
    }

    await Promise.all(nextApps.items.map(async name => {
      try {
        // otherwise fetch it! :)
        nextApps.byName[name] = await getApp(name, appContext);
      } catch (error) {
        // TODO
        console.error(`Can't load app ${name}`, error);
      }
    }));
    console.timeEnd('apps');

    console.time('panels');
    const nextPanels = {
      byId: {},
      items: []
    };

    // we still need to go through all the apps
    parsed.apps.items.forEach(name => {
      // get the list of panels to load
      const panelsToLoad = parsed.apps.byName[name].panels;
      // get the app
      const app = nextApps.byName[name] || apps.byName[name];
      // placeholder for the state should we need it
      let state;

      panelsToLoad.forEach(path => {
        const panelId = `${name}${path}`;
        // exit early if the panel is already loaded
        if (panels.byId[panelId]) {
          return;
        }

        try {
          // find the panel within the app
          let { panel, props } = app.findPanel(path);

          if (typeof panel === 'function') {
            // get the state if any and memoize it for future operations
            if (typeof state === 'undefined') {
              state = app.store && app.store.getState();
            }
            panel = panel(state, props);
          }

          // ensure that the panel has a valid shape and defaults
          ensurePanelShape(panel);

          nextPanels.byId[panelId] = panel;
          nextPanels.items.push(panelId);
        } catch (error) {
          // TODO
          console.error(`Can't load panel ${panelId}`, error);
        }
      });
    });
    console.timeEnd('panels');

    console.time('runtime');
    const maxFullPanelWidth = runtime.viewportWidth - runtime.snapPoint;
    // determine the context and focus panel
    const { context, focus } = getContextAndFocus(
      uri, parsed.routes.items, router.focus, router.context, nextFocus, nextContext
    );

    const widths = parsed.routes.items.map(context => {
      const route = parsed.routes.byContext[context];
      const panel = panels.byId[route.panelId] || nextPanels.byId[route.panelId];

      let width;
      if (route.isVisible) {
        if (runtime.shouldGoMobile) {
          width = runtime.viewportWidth;
        } else {
          width = panel.isExpanded ? panel.maxWidth : panel.width;

          const percentageMatch = typeof width === 'string' && width.match(/([0-9]+)%/);
          if (percentageMatch) {
            width = maxFullPanelWidth * parseInt(percentageMatch, 10) / 100;
          }
        }
      } else {
        width = 0;
      }

      route.width = width;
      return width;
    });

    // get how large our focus panel is
    const focusWidth = widths[focus]; // >> 500
    // get the focus panel's x real position in our runtime if it were flat
    let x = widths.slice(0, focus).reduce((a, b) => a + b, 0); // >> 860
    // get how much space we have left for context panels
    let leftForContext = maxFullPanelWidth - focusWidth; // >> 1089
    // assess how many context panels we should try to show
    let contextsLeft = focus - context - 1;

    // try to fit those context panels within that space that's left
    while (contextsLeft >= 0 && leftForContext >= widths[contextsLeft]) {
      // get the context's width
      const contextWidth = widths[contextsLeft];
      // remove it from the space left for context
      leftForContext -= contextWidth;
      // shift x to include that panel
      x -= contextWidth;
      // decrease the amount of contexts left
      contextsLeft--;
    }
    console.timeEnd('runtime');

    dispatch({
      type: NAVIGATE,
      sequence: {
        type: 'next'
      },
      payload: {
        apps: nextApps,
        panels: nextPanels,
        router: {
          context,
          focus,
          routes: parsed.routes,
          uri
        },
        runtime: {
          regions: getRegions(widths),
          snappedAt: focus - contextsLeft,
          width: maxFullPanelWidth + widths.reduce((a, b) => a + b, 0),
          widths,
          x
        }
      },
      meta: {
        uri
      }
    });
  }
}
