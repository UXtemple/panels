import { load as loadApp } from '../apps/actions';
import getPanelFromApp from './get-panel-from-app';
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
      const panel = getPanelFromApp(route, app.module.name);
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
        const panel = getPanelPathFromRoute(route);
        const thePanel = getState().panels[panel];

        if (typeof thePanel === 'undefined' || !(thePanel.isLoading || thePanel.isReady || thePanel.error)) {
          dispatch(load(route));
        }
      }
    }
  };
}

export const UPDATE_SETTINGS = 'panels/panels/UPDATE_SETTINGS';
export function updateSettings(route, {background, title}) {
  const settings = {};
  if (background) {
    settings.background = background;
  }
  if (title) {
    settings.title = title;
  }

  return {
    type: UPDATE_SETTINGS,
    payload: {
      id: getPanelPathFromRoute(route),
      settings
    }
  };
}
