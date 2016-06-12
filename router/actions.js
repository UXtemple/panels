import doNavigate from './navigate';

export const NAVIGATE = 'panels/router/NAVIGATE';
export function navigate(rawUri, nextFocus = 1, nextContext) {
  return function navigateThunk(dispatch, getState) {
    const { router } = getState();

    dispatch({
      type: NAVIGATE,
      payload: doNavigate(rawUri, router.focus, router.context, nextFocus, nextContext)
    });
  }
}

export const SHOW = 'panels/router/SHOW';
export function show(route) {
  return {
    type: SHOW,
    payload: route
  };
}
