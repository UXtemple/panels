import { PANELS_APP } from './middleware';

export const LOAD = 'panels/apps/LOAD';
export function load(app) {
  return {
    type: LOAD,
    payload: {
      [PANELS_APP]: true
    },
    meta: {
      app
    }
  };
}

export function loadAppIfNeeded(route) {
  return function loadAppIfNeededThunk(dispatch, getState) {
    // TODO implement smarter app loading, not a big deal until we implement sliced routes
    if (route.path !== '/') {
      return;
    }

    const app = getState().apps[route.app];

    if (typeof app === 'undefined' || !(app.isLoading || app.isReady)) {
      dispatch(load(route.app));
    }
  };
}
