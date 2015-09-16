import getPanelFromApp from './get-panel-from-app';
import getPanelPathFromRoute from '../router/get-panel-path-from-route';
import getTypeFromApp from './get-type-from-app';

export const LOAD = 'PANELS:LOAD';
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
      const { background, props, title, type } = getPanelFromApp(route);
      const Type = getTypeFromApp(route.app, type);

      dispatch({
        type: LOAD,
        payload: {
          background,
          panel,
          props,
          title,
          Type
        }
      });
    }
  };
}
