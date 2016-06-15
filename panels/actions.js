import getNextPosition from '../runtime/get-next-position';

export const TOGGLE_EXPAND = 'panels/panels/TOGGLE_EXPAND';
export function toggleExpand(route) {
  return function toggleExpandThunk(dispatch, getState) {
    const { panels, router, runtime } = getState();

    const routes = router.routes;

    routes.byContext[route.context] = {
      ...route,
      isExpanded: !route.isExpanded
    };

    const nextPosition = getNextPosition({
      context: router.context,
      focus: router.focus,
      maxFullPanelWidth: runtime.maxFullPanelWidth,
      routes,
      panels,
      shouldGoMobile: runtime.shouldGoMobile
    });

    dispatch({
      type: TOGGLE_EXPAND,
      payload: nextPosition
    });
  }
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
      id: route.panelId,
      settings
    }
  };
}
