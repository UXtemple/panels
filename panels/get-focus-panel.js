import getPanelPathFromRoute from '../router/get-panel-path-from-route';

export default function getFocusPanel(routes, panels) {
  const focusRoute = routes[routes.length - 1];

  return panels[getPanelPathFromRoute(focusRoute)] || false;
}
