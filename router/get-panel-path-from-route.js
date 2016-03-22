export default function getPanelFromRoute(route = {}) {
  return `${route.app}${route.path}`;
}
