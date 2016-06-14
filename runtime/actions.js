import getIndexOfPanelToShow from './get-index-of-panel-to-show';

export const MOVE_LEFT = 'panels/runtime/MOVE_LEFT';
export function moveLeft() {
  return function moveLeftThunk(dispatch, getState) {
    const { runtime } = getState();

    if (runtime.snappedAt > 0) {
      const nextSnappedAt = runtime.snappedAt - 1;

      dispatch({
        type: MOVE_LEFT,
        payload: {
          snappedAt: nextSnappedAt,
          x: runtime.x - runtime.widths[nextSnappedAt]
        }
      });
    }
  }
}

export const MOBILE_THRESHOLD = 720;

export const SET_VIEWPORT_WIDTH = 'panels/runtime/SET_VIEWPORT_WIDTH';
export function setViewportWidth(nextViewportWidth) {
  return function setViewportWidthThunk(dispatch, getState) {
    const { panels, router, runtime } = getState();

    const nextShouldGoMobile = nextViewportWidth <= MOBILE_THRESHOLD;
    const nextSnapPoint = nextShouldGoMobile ? 0 : runtime.preferredSnapPoint;

    console.time('runtime');
    const maxFullPanelWidth = nextShouldGoMobile ?
      nextViewportWidth :
      nextViewportWidth - nextSnapPoint;

    const nextRoutes = {
      byContext: router.routes.byContext,
      items: router.routes.items
    };
    const widths = router.routes.items.map(context => {
      const route = router.routes.byContext[context];
      const panel = panels.byId[route.panelId];

      let width;
      if (nextShouldGoMobile) {
        width = nextViewportWidth;
      } else {
        width = panel.isExpanded ? panel.maxWidth : panel.width;

        const percentageMatch = typeof width === 'string' && width.match(/([0-9]+)%/);
        if (percentageMatch) {
          width = maxFullPanelWidth * parseInt(percentageMatch, 10) / 100;
        }
      }

      if (width !== route.width) {
        nextRoutes.byContext[context] = {
          ...route,
          width
        };
      }

      return width;
    });

    // get how large our focus panel is
    const focusWidth = widths[router.focus]; // >> 500
    // get the focus panel's x real position in our runtime if it were flat
    let x = widths.slice(0, router.focus).reduce((a, b) => a + b, 0); // >> 860
    // get how much space we have left for context panels
    let leftForContext = maxFullPanelWidth - focusWidth; // >> 1089
    // assess how many context panels we should try to show
    let contextsLeft = router.focus - router.context - 1;

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
      type: SET_VIEWPORT_WIDTH,
      payload: {
        routes: nextRoutes,
        shouldGoMobile: nextShouldGoMobile,
        snapPoint: nextSnapPoint,
        viewportWidth: nextViewportWidth,
        width: maxFullPanelWidth + widths.reduce((a, b) => a + b, 0),
        widths,
        x
      }
    });
  }
}

export const SET_X = 'panels/runtime/SET_X';
export function setX(fromX) {
  return function setXThunk(dispatch, getState) {
    const { runtime } = getState();

    if (runtime.x !== fromX) {
      const nextSnappedAt = getIndexOfPanelToShow(fromX, runtime.regions);
      const nextX = runtime.widths.slice(0, nextSnappedAt).reduce((a, b) => a + b, 0);

      dispatch({
        type: SET_X,
        payload: {
          snappedAt: nextSnappedAt,
          x: nextX
        }
      });
    }
  }
}
