import getNextPosition from '../runtime/get-next-position';

export const TOGGLE_EXPAND = 'panels/panels/TOGGLE_EXPAND';
export function toggleExpand(routeContext) {
  return function toggleExpandThunk(dispatch, getState) {
    const { panels, router, runtime } = getState();

    const routes = router.routes;
    const route = routes.byContext[routeContext];
    const routeIndex = routes.items.indexOf(routeContext);

    routes.byContext[routeContext] = {
      ...route,
      isExpanded: !route.isExpanded
    };

    const nextPosition = getNextPosition({
      // snap at the expanded position!
      context: routeIndex - runtime.snappedAt,
      focus: routeIndex,
      maxFullPanelWidth: runtime.maxFullPanelWidth,
      routes,
      panels,
      shouldGoMobile: runtime.shouldGoMobile,
      viewportWidth: runtime.viewportWidth
    });

    dispatch({
      type: TOGGLE_EXPAND,
      payload: nextPosition
    });
  }
}

export const UPDATE_SETTINGS = 'panels/panels/UPDATE_SETTINGS';
export function updateSettings(routeContext, { maxWidth, title, styleBackground, width }) {
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

  const route = routes.byContext[routeContext];

  return {
    type: UPDATE_SETTINGS,
    payload: {
      id: route.panelId,
      settings
    }
  };
}
