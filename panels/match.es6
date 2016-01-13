import RLookup from 'rlookup';

function parseParams(params, text='') {
  Object.keys(params).forEach(param => text = text.replace(new RegExp(`(.*):(${param})(.*)`), `$1${params[param]}$3`));
  return text;
}

function parseProps(params, props) {
  let newProps = {};
  Object.keys(props).forEach(key => newProps[key] = parseParams(params, props[key]));
  return newProps;
}

export default function match(route, moduleName) {
  const module = require(moduleName);

  const panelMatch = new RLookup({
    patterns: module.lookup
  }).match(route.path);

  if (typeof panelMatch !== 'undefined') {
    const panel = module.panels[panelMatch.pattern];

    return {
      ...panel,
      props: parseProps(panelMatch.params, panel.props)
    };
  }
}
