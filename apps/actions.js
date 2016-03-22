import { navigate } from '../router/actions';
import get from './get';

export const LOAD = 'panels/apps/LOAD';
export function load(app) {
  return function loadThunk(dispatch, getState) {
    // TODO review, this is a bit ugly but it allows us to pass in some context
    // to the app, like giving it the ability to navigate to another URI.
    // I'm wondering if we even should...
    const context = {
      navigate: uri => dispatch(navigate(uri))
    };

    dispatch({
      type: LOAD,
      payload: get(app, context),
      meta: {
        app
      }
    });
  }
}

export function loadAppIfNeeded(route) {
  return function loadAppIfNeededThunk(dispatch, getState) {
    const app = getState().apps[route.app];

    if (typeof app === 'undefined' || !(app.isLoading || app.isReady || app.error)) {
      dispatch(load(route.app));
    }
  };
}
