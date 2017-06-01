import Route from 'houkou'

// sorting mechanism for matched candidates
const FORWARD_SLASHES_REGEX = /\//g
const complexity = pattern => pattern.match(FORWARD_SLASHES_REGEX).length
function compare(a, b) {
  return complexity(b.pattern) - complexity(a.pattern)
}

// cache the app's patterns as routes ready to be matched
const getPatterns = lookup =>
  lookup.map(def => {
    const { pattern, ...config } = typeof def === 'string'
      ? { pattern: def }
      : def

    return {
      pattern,
      route: new Route(pattern, config),
    }
  })

// define a matcher in case we need to work with a dynamic panel
const match = (path, lookup) =>
  getPatterns(lookup)
    .map(({ pattern, route }) => {
      const params = route.match(path)

      if (params) {
        return {
          params,
          pattern,
        }
      } else {
        return false
      }
    })
    .filter(Boolean)
    .sort(compare)[0]

export default function createFindPanel(panels, lookup = []) {
  // return our grand matcher
  return function findPanel(path) {
    // the panel might be static...
    let panel = panels[path]
    let props

    // TODO is there any case in which the panel's function should always be called if it's a
    // dynamic match?
    if (typeof panel === 'undefined') {
      // ...or dynamic
      const matchedPath = match(path, lookup)

      if (matchedPath) {
        panel = panels[matchedPath.pattern]
        props = matchedPath.params
      }
    } else {
      props = panel.props || {}
    }

    return {
      panel,
      props,
    }
  }
}
