import getNextPosition from '../runtime/get-next-position';

export const TOGGLE_EXPAND = 'panels/panels/TOGGLE_EXPAND';
export function toggleExpand(routeContext) {
  return function toggleExpandThunk(dispatch, getState) {
    const { panels, router, runtime } = getState();

    const routes = router.routes;
    const route = routes.byContext[routeContext];
    const routeIndex = routes.items.indexOf(routeContext);

    routes.byContext = {
      ...routes.byContext,
      [routeContext]: {
        ...route,
        isExpanded: !route.isExpanded
      }
    };

    const nextPosition = getNextPosition({
      // snap at the expanded position!
      context: router.context, // routeIndex - runtime.snappedAt,
      focus: router.focus, // routeIndex,
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
  };
}

export const UPDATE_SETTINGS = 'panels/panels/UPDATE_SETTINGS';
export function updateSettings(routeContext, { maxWidth, title, styleBackground, width }) {
  return function updateSettingsThunk(dispatch, getState) {
    const { panels, router, runtime } = getState();

    const nextPanels = {
      byId: panels.byId,
      items: panels.items
    };

    const route = router.routes.byContext[routeContext];

    if (!route.isVisible) return;

    const routeIndex = router.routes.items.indexOf(routeContext);
    const panel = {
      ...nextPanels.byId[route.panelId]
    };

    if (maxWidth) {
      panel.maxWidth = maxWidth;
    }
    if (title) {
      panel.title = title;
    }
    if (styleBackground) {
      panel.styleBackground = styleBackground;
    }
    if (width) {
      panel.width = width;
    }

    nextPanels.byId = {
      ...nextPanels.byId,
      [route.panelId]: panel
    };

    let nextPosition;
    if (maxWidth || width) {
      nextPosition = getNextPosition({
        context: router.context,
        focus: router.focus,
        maxFullPanelWidth: runtime.maxFullPanelWidth,
        routes: router.routes,
        panels: nextPanels,
        shouldGoMobile: runtime.shouldGoMobile,
        viewportWidth: runtime.viewportWidth
      });
    }

    dispatch({
      type: UPDATE_SETTINGS,
      payload: {
        nextPanelsById: nextPanels.byId,
        nextPosition
      }
    });
  };
}
