import calculateState, { MOBILE_THRESHOLD } from './calculate-state';
import getIndexOfPanelToShow from './get-index-of-panel-to-show';
import getPanelPathFromRoute from '../router/get-panel-path-from-route';
import getXToSnapTo from './get-x-to-snap-to';
import sum from '../utils/sum';

// TODO either store the currently snapped panel or memoise this
export const MOVE_LEFT = 'panels/runtime/MOVE_LEFT';
export function moveLeft() {
  return function moveLeftThunk(dispatch, getState) {
    const { runtime } = getState();

    let index = getIndexOfPanelToShow(runtime.x, runtime.regions) - 1;
    if (runtime.widths[index] === 0) {
      index--;
    }

    if (index >= 0) {
      dispatch({
        type: MOVE_LEFT,
        payload: {
          x: runtime.widths.slice(0, index).reduce(sum, 0)
        }
      });
    }
  }
}

// TODO simplify
// TODO extract preferredSnapPoint into state
export const RESET = 'panels/runtime/RESET';
export function reset(preferredSnapPoint, nextViewportWidth) {
  return function resetThunk(dispatch, getState) {
    const { panels, router, runtime } = getState();
    const viewportWidth = nextViewportWidth || runtime.viewportWidth;
    const snapPoint = preferredSnapPoint || runtime.snapPoint;

    const maxWidth = viewportWidth - snapPoint;
    const shouldGoMobile = viewportWidth < MOBILE_THRESHOLD;

    const panelsWidths = router.routes.map((route, i) => {
      const panel = panels.byId[getPanelPathFromRoute(route)];

      if (shouldGoMobile) {
        return viewportWidth;
      } else {
        let width = 360;

        // TODO if reset is because of expanded, we shouldn't snap
        if (route.visible) {
          if (panel) {
            width = panel.isExpanded ? panel.maxWidth : panel.width;
          }
        } else {
          width = 0;
        }

        return Math.min(maxWidth, width);
      }
    });

    const nextState = calculateState(viewportWidth, panelsWidths, snapPoint, shouldGoMobile);

    const { context, focus } = router;
    // get how large our focus panel is
    const focusWidth = nextState.widths[focus]; // >> 500
    // get the focus panel's x real position in our runtime if it were flat
    let x = nextState.widths.slice(0, focus).reduce(sum, 0); // >> 860
    // get how much space we have left for context panels
    let leftForContext = viewportWidth - snapPoint - focusWidth; // >> 1089
    // assess how many context panels we should try to show
    let contextsLeft = focus - context; // >> 1

    // try to fit those context panels within that space that's left
    while (contextsLeft > 0 && leftForContext >= nextState.widths[contextsLeft]) {
      // get the context's width
      const contextWidth = nextState.widths[contextsLeft];
      // remove it from the space left for context
      leftForContext -= contextWidth;
      // shift x to include that panel
      x -= contextWidth;
      // decrease the amount of contexts left
      contextsLeft--;
    }

    dispatch({
      type: RESET,
      payload: {
        ...nextState,
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
      // TODO should we rework this?
      // it's a trick to force re-snapping if you've moved within the same panel's region
      // the initial set won't have any effect on the runtime renderer because the values are the
      // same so it will only try to snap on the second set below
      dispatch({
        type: SET_X,
        payload: {
          x: fromX
        }
      });

      dispatch({
        type: SET_X,
        payload: {
          x: getXToSnapTo(fromX, runtime.regions, runtime.widths)
        }
      });
    }
  }
}
