import getIndexOfPanelToShow from './get-index-of-panel-to-show';
import getNextPosition from './get-next-position';

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

export const MOVE_TO = 'panels/runtime/MOVE_TO';
export function moveTo(to) {
  return function moveToThunk(dispatch, getState) {
    const { router, runtime } = getState();

    // check that we're not already snapped there and that the panel we're trying to snap to exists
    if (runtime.snappedAt !== to && to >= 0 && to < router.routes.items.length) {
      const x = runtime.widths.slice(0, to).reduce((a, b) => a + b, 0);

      dispatch({
        type: MOVE_TO,
        payload: {
          snappedAt: to,
          x // : runtime.x - runtime.widths[to]
        }
      });
    }
  }
}


export const MOBILE_THRESHOLD = 720;

export const SET_VIEWPORT_WIDTH = 'panels/runtime/SET_VIEWPORT_WIDTH';
export function setViewportWidth(viewportWidth) {
  return function setViewportWidthThunk(dispatch, getState) {
    const { panels, router, runtime } = getState();

    const shouldGoMobile = viewportWidth <= MOBILE_THRESHOLD;
    const snapPoint = shouldGoMobile ? 0 : runtime.preferredSnapPoint;
    const maxFullPanelWidth = viewportWidth - snapPoint;

    const nextPosition = getNextPosition({
      context: router.context,
      focus: router.focus,
      maxFullPanelWidth,
      routes: router.routes,
      panels,
      shouldGoMobile,
      viewportWidth
    });

    dispatch({
      type: SET_VIEWPORT_WIDTH,
      payload: {
        maxFullPanelWidth,
        shouldGoMobile,
        snapPoint,
        viewportWidth,
        ...nextPosition
      }
    });
  }
}

export const SET_X = 'panels/runtime/SET_X';
export function setX(fromX) {
  return function setXThunk(dispatch, getState) {
    const { router, runtime } = getState();
    const snappedAt = getIndexOfPanelToShow(fromX, runtime.regions);
    const x = runtime.widths.slice(0, snappedAt).reduce((a, b) => a + b, 0);

    if (x === fromX) {
      if (runtime.x !== x) {
        dispatch({
          type: SET_X,
          payload: {
            snappedAt,
            x
          }
        });
      }
    } else {
      // TODO fix this horrible hack :) we're using it to snap at the edges
      // we should ideally only be dispatching the second one not x: fromX
      dispatch({
        type: SET_X,
        payload: {
          snappedAt,
          x: fromX
        }
      });

      dispatch({
        type: SET_X,
        payload: {
          snappedAt,
          x
        }
      });
    }
  }
}
