import createFindPanel from './create-find-panel'
import isRequireable from './is-requireable'
import loadResource from './load-resource'

async function loadModule(app) {
  let module = {}

  try {
    const response = await fetch(`//${app}/panels.json`)
    const data = await response.json()

    if (data.module) {
      module = data.module
    }

    await loadResource(data.logic)
  } catch (err) {
    console.error(err)
    if (err instanceof SyntaxError) {
      throw new Error(`We can't load ${app}.
        We can't find your app's logic source.

        If you're inlining your app with Panels, make sure the script tag is inserted after panels
        and that the required export matches ${app}.

        If your app is expected to be fetched from a remote source, make sure that
        '//${app}/panels.json' in place and that it at least includes the logic key pointing to
        your application's JS logic URI.

        {
          "logic": "https://panels.com/my-application-logic.js"
        }`)
    }
  }

  return module
}

const DENY = () => false

export default async function get(app, createContext) {
  let data
  let name = app
  let props = {}

  if (!isRequireable(name)) {
    const inline = window.panelsJson && window.panelsJson[name]
    if (inline) {
      data = inline.module

      if (!isRequireable(data.name)) {
        console.error(`You should embed your app's panels bundle script tag`)
      }
    }

    if (!data) {
      data = await loadModule(app)
    }

    if (data.name) {
      name = data.name
    }
    if (data.props) {
      props = data.props
    }
  }

  /* eslint-disable global-require */
  const { access = DENY, lookup, panels, setup, types } = require(name)

  const context = createContext(app, name)

  return {
    access,
    findPanel: createFindPanel(panels, lookup),
    name,
    store: typeof setup === 'function' && await setup(app, props, context),
    types
  }
}
