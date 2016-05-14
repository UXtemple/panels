import doNavigate from './navigate';

export const NAVIGATE = 'panels/router/NAVIGATE';
export function navigate(rawUri, nextFocus=1, nextContext=0) {
  return function navigateThunk(dispatch, getState) {
    const { router } = getState();

    dispatch({
      type: NAVIGATE,
      payload: doNavigate(rawUri, getState().router.focus, nextFocus, nextContext)
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
