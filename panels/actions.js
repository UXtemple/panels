import { load as loadApp } from '../apps/actions';
import getPanelPathFromRoute from '../router/get-panel-path-from-route';

export const TOGGLE_EXPAND = 'panels/panels/TOGGLE_EXPAND';
export function toggleExpand(route) {
  return {
    type: TOGGLE_EXPAND,
    payload: {
      id: getPanelPathFromRoute(route)
    }
  };
}

export const LOAD = 'panels/panels/LOAD';
export function load(route) {
  return function loadThunk(dispatch, getState) {
    const app = getState().apps[route.app];

    let action = {
      type: LOAD,
      meta: {
        id: getPanelPathFromRoute(route)
      }
    };

    try {
      const { panel, props } = app.findPanel(route.path);
      // TODO check for a malformed panel
      action.payload = typeof panel === 'function' ?
        panel(app.store && app.store.getState(), props) :
        { ...panel, props };

      if (typeof action.payload.width !== 'number') {
        action.payload.width = 360;
      }
    } catch(err) {
      err.status = 404;

      action.error = true;
      action.payload = err;
    }

    dispatch(action);
  }
}
/**
 *  Load apps on demand
 *
 *  @param app String the app's domain
 */
export function loadPanelIfNeeded(route) {
  return function loadPanelIfNeededThunk(dispatch, getState) {
    const app = getState().apps[route.app];

    if (typeof app === 'undefined' || !(app.isLoading || app.isReady || app.error)) {
      dispatch(loadApp(route.app));
    } else {
      if (app.isReady || app.error) {
        const path = getPanelPathFromRoute(route);
        const panel = getState().panels.byId[path];

        if (typeof panel === 'undefined' || !(panel.isLoading || panel.isReady || panel.error)) {
          dispatch(load(route));
        }
      }
    }
  };
}

export const UPDATE_SETTINGS = 'panels/panels/UPDATE_SETTINGS';
export function updateSettings(route, { maxWidth, title, styleBackground, width }) {
  const settings = {};
  if (maxWidth) {
    settings.maxWidth = maxWidth;
  }
  if (title) {
    settings.title = title;
  }
  if (styleBackground) {
    settings.styleBackground = styleBackground;
  }
  if (width) {
    settings.width = width;
  }

  return {
    type: UPDATE_SETTINGS,
    payload: {
      id: getPanelPathFromRoute(route),
      settings
    }
  };
}
