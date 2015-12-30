import 'regenerator/runtime';
import isRequireable from '../utils/is-requireable';
import loadResource from './load-resource';

async function loadModule(app) {
  try {
    const response = await fetch(`//${app}/panels.json`);
    const data = await response.json();
    const resources = [loadResource(data.logic)];
    if (data.style) {
      resources.push(loadResource(data.style));
    }
    const loadedResources = await Promise.all(resources);
    return data.module || {};
  } catch(err) {
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
        }`);
    }
  }
}

export default async function get(app) {
  let name = app;
  let props = {};

  if (!isRequireable(name)) {
    const data = await loadModule(app);

    if (data.name) {
      name = data.name;
    }
    if (data.props) {
      props = data.props;
    }
  }
  const module = require(name);

  let store = false;
  if (typeof module.configureStore === 'function') {
    const initialState = typeof module.getInitialState === 'function' ?
      await module.getInitialState(app, props) : {};

    store = module.configureStore(initialState);
  }

  return {
    module: {
      name,
      props
    },
    store
  };
}
