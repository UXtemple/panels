import match from './match';

export default function getPanelFromApp(route) {
  const dep = require(route.app);

  return dep.panels[route.path] || match(route);
}
