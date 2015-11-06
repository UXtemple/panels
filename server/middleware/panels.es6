import { load } from '../../panels/actions';
import getPanelPathFromRoute from '../../router/get-panel-path-from-route';
import include from '../../utils/include';
import panelsReducer from '../../panels/reducer';

export default function getPanels(requireableRoutes) {
  return requireableRoutes.
    map(load).
    reduce((state, action) => panelsReducer(state, action), undefined);
}

export function getPanelsPropsByApp(requireableRoutes, panels) {
  const panelsPropsByApp = {};

  requireableRoutes.forEach(route => {
    const panel = {
      path: route.path,
      props: panels[getPanelPathFromRoute(route)]
    };
    panelsPropsByApp[route.app] = include(panel, panelsPropsByApp[route.app])
  });

  return panelsPropsByApp;
}
