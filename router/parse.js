import withTrailingSlash from './with-trailing-slash'

const DEFAULT_PARSER = /^https?:\/\/([a-zA-Z0-9\-_\.]+)()(\/.*)/
const PROTOCOL = /(https?):\/\//
const SLICE_END = ')'
const SLICE_START = '('
const SLICE_MARKERS = new RegExp(`[${SLICE_START}${SLICE_END}]`, 'g')

const cleanPath = s => /\?/.test(s) ? s.match(/(.*?)\?/)[1] : s

export default function parse(uri, parsers = []) {
  const apps = {
    byName: {},
    items: []
  }
  const routes = {
    byContext: {},
    items: []
  }

  // Make sure we always have a trailing slash on the URI
  const protocol = uri.match(PROTOCOL)[1]
  let nextUri = withTrailingSlash(uri)

  do {
    let app
    let path
    let fullPath

    const parser = parsers.find(p => p.test(nextUri)) || DEFAULT_PARSER
    const result = nextUri.match(parser)
    if (result) {
      app = result[1]
      fullPath = cleanPath(result[3] || '/')
    }

    if (PROTOCOL.test(fullPath)) {
      path = fullPath.split(PROTOCOL)[0]
      nextUri = fullPath.replace(path, '')
    } else {
      path = fullPath
      nextUri = undefined
    }

    const base = `${protocol}://${app}`
    const context = routes.items.length > 0 ? routes.items[routes.items.length - 1] : ''

    // Get every path 'bit' which is indeed every panel we need to load
    let pathRoute = []
    let isVisible = true
    do {
      path = path.split('/')
      const lastBit = path.length > 1 ? path[path.length - 2] : ''
      path = path.slice(0, path.length - 1).join('/')
      const hasSliceEndMarkerForRoot = lastBit.indexOf(SLICE_END) === 0
      const hasSliceEndMarker = !hasSliceEndMarkerForRoot && lastBit.indexOf(SLICE_END) > -1
      const hasSliceStartMarker = lastBit.indexOf(SLICE_START) > -1

      if (hasSliceEndMarker || hasSliceStartMarker) {
        isVisible = false
      }

      const panelPath = path.replace(SLICE_MARKERS, '') || '/'

      const panelId = `${app}${panelPath}`

      pathRoute.push({
        app,
        context: `${context}${base}${withTrailingSlash(path)}`,
        isVisible,
        panelId,
        path: panelPath
      })

      isVisible = hasSliceEndMarkerForRoot ? false : (hasSliceStartMarker ? true : isVisible)
    } while (path.length)

    if (apps.items.indexOf(app) === -1) {
      apps.items.push(app)
      apps.byName[app] = {
        app,
        panels: []
      }
    }

    pathRoute.reverse().forEach(route => {
      routes.byContext[route.context] = route
      routes.items.push(route.context)

      if (apps.byName[app].panels.indexOf(route.path) === -1) {
        apps.byName[app].panels.push(route.path)
      }
    })
  } while (nextUri)

  return {
    apps,
    routes
  }
}
