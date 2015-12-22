import calculateState from './calculate-state';
import getIndexOfPanelToShow from './get-index-of-panel-to-show';
import getPanelPathFromRoute from '../router/get-panel-path-from-route';
import getXToSnapTo from './get-x-to-snap-to';
import sum from '../utils/sum';

export const TOGGLE_SHOULD_EXPAND_FOCUS = 'panels/runtime/TOGGLE_SHOULD_EXPAND_FOCUS';
export function toggleShouldExpandFocus() {
  return function toggleShouldExpandFocusThunk(dispatch, getState) {
    dispatch({
      type: TOGGLE_SHOULD_EXPAND_FOCUS,
      payload: {
        shouldExpandFocus: !getState().runtime.shouldExpandFocus
      }
    });

    dispatch(reset());
  }
}

export const MOVE_LEFT = 'panels/runtime/MOVE_LEFT';
export function moveLeft() {
  return function moveLeftThunk(dispatch, getState) {
    const { runtime } = getState();

    const index = getIndexOfPanelToShow(runtime.x, runtime.regions) - 1;

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

export const RESET = 'panels/runtime/RESET';
export function reset(preferredSnapPoint, nextViewportWidth) {
  return function resetThunk(dispatch, getState) {
    const { panels, router, runtime } = getState();
    const viewportWidth = nextViewportWidth || runtime.viewportWidth;
    const snapPoint = preferredSnapPoint || runtime.snapPoint;

    const panelsWidths = router.routes.map((route, i) => {
      const panel = panels[getPanelPathFromRoute(route)];

      if (runtime.shouldExpandFocus && i === router.routes.length - 1) {
        return viewportWidth - snapPoint;
      } else {
        return route.visible ? (panel && panel.width) || 360 : 32;
      }
    });

    const nextState = calculateState(viewportWidth, panelsWidths, snapPoint);

    // if the viewport changed, readjust our position to the panel we were looking at
    // otherwise use the newly added panel
    const index = nextViewportWidth ?
      getIndexOfPanelToShow(runtime.x, runtime.regions) :
      panelsWidths.length - 1;

    dispatch({
      type: RESET,
      payload: {
        ...nextState,
        x: nextState.widths.slice(0, index).reduce(sum, 0)
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
