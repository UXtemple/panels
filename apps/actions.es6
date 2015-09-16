export const LOAD = 'APPS:LOAD';
/**
 *  Load an app
 *
 *  @param app String the app's domain
 */
export function load(app) {
  return {
    type: LOAD,
    payload: {
      app
    }
  };
}

/**
 *  Load apps on demand
 *
 *  @param app String the app's domain
 */
export function loadAppIfNeeded(route) {
  return function loadAppIfNeededThunk(dispatch, getState) {
    // TODO implement smarter app loading, not a big deal until we implement sliced routes
    if (route.path !== '/') {
      return;
    }

    const app = getState().apps[route.app];

    if (typeof app === 'undefined') {
      try {
        require(route.app);
        dispatch(ready(route.app));
      } catch(err) {
        /Cannot find module/.test(err.message) ?
          dispatch(load(route.app)) :
          dispatch(failed(route.app));
      }
    }
  };
}

export const LOADING = 'APPS:LOADING';
/**
 *  Indicate that an app is loading
 *
 *  @param app String the app's domain
 */
export function loading(app) {
  return {
    type: LOADING,
    payload: {
      app
    }
  };
}

export const READY = 'APPS:READY';
/**
 *  Indicate that an app is ready to be used
 *
 *  @param app String the app's domain
 */
export function ready(app) {
  const dep = require(app);

  return {
    type: READY,
    payload: {
      app,
      store: dep.configureStore()
    }
  };
}

export const FAILED = 'APPS:FAILED';
/**
 *  Indicate that an app failed to load
 *
 *  @param app String the app's domain
 */
export function failed(app) {
  return {
    type: FAILED,
    payload: {
      app
    }
  };
}
