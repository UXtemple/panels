import { navigate } from '../router/actions';
import get from './get';

export const LOAD = 'panels/apps/LOAD';
export function load(app) {
  return function loadThunk(dispatch, getState) {
    dispatch({
      meta: {
        app
      },
      // TODO review, this is a bit ugly but it allows us to pass in some context
      // to the app, like giving it the ability to navigate to another URI.
      // I'm wondering if we even should...
      payload: get(app, {
        navigate(uri, focus, context) {
          dispatch(navigate(uri, focus, context))
        }
      }),
      type: LOAD
    });
  }
}
