import { load as loadApp } from '../apps/actions';
import getPanelPathFromRoute from '../router/get-panel-path-from-route';
import prepare from './prepare';

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
      const panel = app.findPanel(route.path);
      action.payload = prepare(panel, app.store.getState);
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
        const panel = getState().panels[path] || {};

        if (typeof panel === 'undefined' || !(panel.isLoading || panel.isReady || panel.error)) {
          dispatch(load(route));
        }
      }
    }
  };
}

export const UPDATE_SETTINGS = 'panels/panels/UPDATE_SETTINGS';
export function updateSettings(route, {background, maxWidth, title, width}) {
  const settings = {};
  if (background) {
    settings.background = background;
  }
  if (maxWidth) {
    settings.maxWidth = maxWidth;
  }
  if (title) {
    settings.title = title;
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
