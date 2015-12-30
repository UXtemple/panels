import match from './match';

export default function getPanelFromApp(route, moduleName) {
  const module = require(moduleName);

  return module.panels[route.path] || match(route, moduleName);
}
