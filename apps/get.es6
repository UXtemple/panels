import 'regenerator/runtime';
import isRequireable from '../utils/is-requireable';
import loadResource from './load-resource';

async function loadModule(app) {
  const response = await fetch(`//${app}/panels.json`);
  const data = await response.json();
  const loadedResources = await Promise.all([data.logic, data.style].map(loadResource));
  return data.module && data.module.name || app;
}

export default async function get(app) {
  let moduleName = app;
  let module;

  if (!isRequireable(moduleName)) {
    moduleName = await loadModule(app);
  }
  module = require(moduleName);

  let store = false;
  if (typeof module.configureStore === 'function') {
    const initialState = typeof module.getInitialState === 'function' ?
      await module.getInitialState(app) : {};

    store = module.configureStore(initialState);
  }

  return {
    moduleName,
    store
  };
}
