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

export const MOBILE_THRESHOLD = 720;

export const SET_VIEWPORT_WIDTH = 'panels/runtime/SET_VIEWPORT_WIDTH';
export function setViewportWidth(viewportWidth) {
  return function setViewportWidthThunk(dispatch, getState) {
    const { panels, router, runtime } = getState();

    const shouldGoMobile = viewportWidth <= MOBILE_THRESHOLD;
    const snapPoint = shouldGoMobile ? 0 : runtime.preferredSnapPoint;
    const maxFullPanelWidth = shouldGoMobile ? viewportWidth : viewportWidth - snapPoint;

    const nextPosition = getNextPosition({
      context: router.context,
      focus: router.focus,
      maxFullPanelWidth,
      routes: router.routes,
      panels,
      shouldGoMobile
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
