import getPanelFromApp from './get-panel-from-app';
import getPanelPathFromRoute from '../router/get-panel-path-from-route';

export const LOAD = 'PANELS:LOAD';
export function load(route) {
  const panel = getPanelPathFromRoute(route);
  const { background, props, title, type } = getPanelFromApp(route);

  return {
    type: LOAD,
    payload: {
      background,
      panel,
      props,
      title,
      type
    }
  };
}
/**
 *  Load apps on demand
 *
 *  @param app String the app's domain
 */
export function loadPanelIfNeeded(route) {
  return function loadPanelIfNeededThunk(dispatch, getState) {
    const panel = getPanelPathFromRoute(route);
    const thePanel = getState().panels[panel];

    if (typeof thePanel === 'undefined') {
      dispatch(load(route));
    }
  };
}
