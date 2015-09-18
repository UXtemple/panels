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

export default function match(route) {
  const dep = require(route.app);

  const panelMatch = new RLookup({
    patterns: dep.lookup
  }).match(route.path);

  if (typeof panelMatch !== 'undefined') {
    const panel = dep.panels[panelMatch.pattern];

    return {
      background: panel.background,
      props: parseProps(panelMatch.params, panel.props),
      title: panel.title,
      type: panel.type
    };
  }
}
