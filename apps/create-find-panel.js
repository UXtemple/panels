import Route from 'houkou';

// sorting mechanism for matched candidates
const FORWARD_SLASHES_REGEX = /\//g;
const complexity = pattern => pattern.match(FORWARD_SLASHES_REGEX).length;
function compare({pattern: patternA}, {pattern: patternB}) {
  return complexity(patternB) - complexity(patternA);
}

// helpers to parse dynamically matched params into panels props
// TODO this could use some love :)
function parseParams(params, rawText='') {
  let text = rawText;

  Object.keys(params).forEach(key => {
    text = text.replace(new RegExp(`(.*):(${key})(.*)`), `$1${params[key]}$3`);
  });

  return text;
}
function parseProps(rawProps, params) {
  const props = {};

  Object.keys(rawProps).forEach(key => {
    props[key] = parseParams(params, rawProps[key]);
  });

  return props;
}

export default function createFindPanel(panels, lookup=[]) {
  // cache the app's patterns as routes ready to be matched
  const patterns = lookup.map(def => {
    const { pattern, ...config } = typeof def === 'string' ? {pattern: def} : def;

    return {
      pattern,
      route: new Route(pattern, config)
    };
  });

  // define a matcher in case we need to work with a dynamic panel
  function match(path) {
    const candidates = [];

    patterns.forEach(({pattern, route}) => {
      const params = route.match(path);

      if (params) {
        candidates.push({pattern, params});
      }
    })

    return candidates.sort(compare)[0] || {};
  }

  // return our grand matcher
  return function findPanel(path) {
    // the panel might be static...
    let panel = panels[path];

    if (typeof panel === 'undefined') {
      // ...or dynamic
      const { pattern, params } = match(path);

      if (typeof pattern !== 'undefined') {
        const { props, ...rest } = panels[pattern];

        // ...if so, we need to build its props from the params we got from the matched path
        // and reuse the rest of the panel from the module's definition
        panel = {
          ...rest,
          props: parseProps(props, params)
        };
      }
    }

    return panel;
  }
}
