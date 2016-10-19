import getApp from './app/get'
import getContextAndFocus from './router/get-context-and-focus'
import getIndexOfPanelToShow from './runtime/get-index-of-panel-to-show'
import getNextPosition from './runtime/get-next-position'
import getRegions from './runtime/get-regions'
import normaliseUri from './utils/normalise-uri/index.js'
import parse from './router/parse'

function ensurePanelShape(panel) {
  if (typeof panel.width === 'undefined') {
    panel.width = 360
  }
}

export const NAVIGATE = 'panels/NAVIGATE'
export function navigate(rawUri, nextFocus = 1, nextContext) {
  return async function navigateThunk(dispatch, getState) {
    const { apps, panels, router, runtime } = getState()

    const uri = normaliseUri(rawUri)
    if (uri === router.uri) {
      return
    }
    const parsed = parse(uri, router.parsers)

    const routes = {
      byContext: parsed.routes.byContext,
      items: parsed.routes.items
    }

    const createAppContext = (appName, appModule) => {
      const access = async name => {
        const app = getState().apps.byName[name]

        if (app) {
          if (app.access(appName, appModule)) {
            return app.store
          } else {
            throw Error(`Access to ${name} denied.`)
          }
        } else {
          throw Error(`App ${name} doesn't exist or it doesn't have a store.`)
        }
      }

      return {
        access,
        navigate: (...args) => dispatch(navigate(...args)),
        routes
      }
    }

    // get the next apps
    const nextApps = {
      byName: {},
      items: parsed.apps.items.filter(name => apps.items.indexOf(name) === -1)
    }

    if (nextApps.items.length) {
      dispatch({
        type: NAVIGATE,
        sequence: {
          type: 'start'
        },
        meta: {
          uri
        }
      })
    }

    await Promise.all(nextApps.items.map(async name => {
      try {
        // otherwise fetch it! :)
        nextApps.byName[name] = await getApp(name, createAppContext)
      } catch (error) {
        // TODO
        console.error(`Can't load app ${name}`, error)
      }
    }))

    const nextPanels = {
      byId: {},
      items: []
    }

    // we still need to go through all the apps
    parsed.apps.items.forEach(name => {
      // get the list of panels to load
      const panelsToLoad = parsed.apps.byName[name].panels
      // get the app
      const app = nextApps.byName[name] || apps.byName[name]

      panelsToLoad.forEach(path => {
        const panelId = `${name}${path}`
        // exit early if the panel is already loaded
        if (panels.byId[panelId]) {
          return
        }

        try {
          // find the panel within the app
          let { panel, props } = app.findPanel(path)

          if (typeof panel === 'function') {
            panel = panel(props, app.store)
          } else {
            panel = {
              ...panel,
              props: props
            }
          }

          // ensure that the panel has a valid shape and defaults
          ensurePanelShape(panel)

          nextPanels.byId[panelId] = panel
          nextPanels.items.push(panelId)
        } catch (error) {
          // TODO
          console.error(`Can't load panel ${panelId}`, error)
        }
      })
    })

    const maxFullPanelWidth = runtime.viewportWidth - runtime.snapPoint
    const isFirstLoad = typeof router.focus === 'undefined'
    const last = parsed.routes.items.length - 1
    // determine the context and focus panel
    const opts = {
      currentFocus: router.focus,
      next: {
        context: nextContext,
        focus: nextFocus
      },
      uri,
      last
    }
    if (isFirstLoad) {
      const focusRoute = parsed.routes.byContext[parsed.routes.items[last]]
      const focusPanel = nextPanels.byId[focusRoute.panelId]
      opts.currentFocus = last
      opts.next.focus = 0
      if (typeof focusPanel.context !== 'undefined') {
        opts.next.context = focusPanel.context
      }
    }
    const { context, focus } = getContextAndFocus(opts)

    const widths = routes.items.map(routeContext => {
      // if (routes.byContext[routeContext]) {
      //   return routes.byContext[routeContext].width
      // }

      const route = routes.byContext[routeContext]
      const panel = panels.byId[route.panelId] || nextPanels.byId[route.panelId]

      let width
      if (route.isVisible) {
        if (runtime.shouldGoMobile) {
          width = runtime.viewportWidth
        } else {
          const prevRoute = router.routes.byContext[routeContext]
          width = route.isExpanded ? panel.maxWidth : ((prevRoute && prevRoute.width) || panel.width)

          const percentageMatch = typeof width === 'string' && width.match(/([0-9]+)%/)
          if (percentageMatch) {
            width = maxFullPanelWidth * parseInt(percentageMatch, 10) / 100
          }
        }
      } else {
        width = 0
      }

      route.width = width
      return width
    })

    // get how large our focus panel is
    const focusWidth = widths[focus] // >> 500
    // get the focus panel's x real position in our runtime if it were flat
    let x = widths.slice(0, focus).reduce((a, b) => a + b, 0) // >> 860
    // get how much space we have left for context panels
    let leftForContext = maxFullPanelWidth - focusWidth // >> 1089
    // assess how many context panels we should try to show
    let contextsLeft = focus - context

    // try to fit those context panels within that space that's left
    while (contextsLeft > 0) {
      // decrease the amount of contexts left
      contextsLeft--

      // get the context's width
      const contextWidth = widths[contextsLeft]

      // check if we have space left for this panel to be a visible context panel
      if (leftForContext < contextWidth) {
        break
      }

      // if we do, remove it from the space left for context
      leftForContext -= contextWidth
      // shift x to include that panel
      x -= contextWidth
    }

    const regions = getRegions(widths)
    const snappedAt = getIndexOfPanelToShow(x, regions)

    dispatch({
      type: NAVIGATE,
      sequence: {
        type: 'next'
      },
      payload: {
        apps: nextApps,
        panels: nextPanels,
        router: {
          context,
          focus,
          routes,
          uri
        },
        runtime: {
          maxFullPanelWidth,
          regions,
          snappedAt,
          width: maxFullPanelWidth + widths.reduce((a, b) => a + b, 0),
          widths,
          x
        }
      },
      meta: {
        uri
      }
    })
  }
}

export const TOGGLE_EXPAND = 'panels/panels/TOGGLE_EXPAND'
export function toggleExpand(routeContext) {
  return function toggleExpandThunk(dispatch, getState) {
    const { panels, router, runtime } = getState()

    const routes = router.routes
    const route = routes.byContext[routeContext]

    routes.byContext = {
      ...routes.byContext,
      [routeContext]: {
        ...route,
        isExpanded: !route.isExpanded
      }
    }

    const nextPosition = getNextPosition({
      // snap at the expanded position!
      context: router.context, // routeIndex - runtime.snappedAt,
      focus: router.focus, // routeIndex,
      maxFullPanelWidth: runtime.maxFullPanelWidth,
      routes,
      panels,
      shouldGoMobile: runtime.shouldGoMobile,
      viewportWidth: runtime.viewportWidth
    })

    dispatch({
      type: TOGGLE_EXPAND,
      payload: nextPosition
    })
  }
}

export const UPDATE_SETTINGS = 'panels/panels/UPDATE_SETTINGS'
export function updateSettings(routeContext, { maxWidth, title, styleBackground, width }) {
  return function updateSettingsThunk(dispatch, getState) {
    const { panels, router, runtime } = getState()

    const nextPanels = {
      byId: panels.byId,
      items: panels.items
    }

    const route = router.routes.byContext[routeContext]

    if (!route.isVisible) return

    const panel = {
      ...nextPanels.byId[route.panelId]
    }

    if (maxWidth) {
      panel.maxWidth = maxWidth
    }
    if (title) {
      panel.title = title
    }
    if (styleBackground) {
      panel.styleBackground = styleBackground
    }
    if (width) {
      panel.width = width
    }

    nextPanels.byId = {
      ...nextPanels.byId,
      [route.panelId]: panel
    }

    let nextPosition
    if (maxWidth || width) {
      nextPosition = getNextPosition({
        context: router.context,
        focus: router.focus,
        maxFullPanelWidth: runtime.maxFullPanelWidth,
        routes: router.routes,
        panels: nextPanels,
        shouldGoMobile: runtime.shouldGoMobile,
        viewportWidth: runtime.viewportWidth
      })
    }

    dispatch({
      type: UPDATE_SETTINGS,
      payload: {
        nextPanelsById: nextPanels.byId,
        nextPosition
      }
    })
  }
}
