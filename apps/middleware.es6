import adapter from './adapter';

// Action key that carries API call info interpreted by this Redux middleware.
export const PANELS_APP = 'panels/apps/middleware/PANELS_APP';

export default function panelsAppMiddleware(store) {
  return next => action => {
    const { [PANELS_APP]: panelsApp } = action.payload || {};

    if (typeof panelsApp === 'undefined' && !panelsApp) {
      return next(action);
    }

    // Dispatch again for redux-promise
    return store.dispatch({
      ...action,
      type: action.type,
      payload: adapter.load(action.meta.app)
    });
  };
}
