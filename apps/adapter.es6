import isRequireable from '../utils/is-requireable';
import loadResource from './load-resource';

function loadResources(app) {
  return fetch(`//${app}/panels.json`)
    .then(res => res.json())
    .then(source => Promise.all([
      loadResource(source.logic),
      loadResource(source.style)
    ]));
}

function load(app, props) {
  const appPromise = isRequireable(app) ? Promise.resolve() : loadResources(app);

  return appPromise
    .then(() => Promise.resolve().then(() => require(app).getInitialState(props)))
    .then(initialState => require(app).configureStore(initialState));
}

export default {
  load
};
