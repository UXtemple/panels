export const TOGGLE_EXPAND = 'panels/panels/TOGGLE_EXPAND';
export function toggleExpand(route) {
  return {
    type: TOGGLE_EXPAND,
    payload: {
      id: route.panelId
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
      id: route.panelId,
      settings
    }
  };
}
