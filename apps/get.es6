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

// TODO FIXME We need to bubble up issues in here. Right now errors are being swallowed almost all
// times ends up in a crazy endless loop of load actions being dispatched :/.
export default function get(app, props) {
  const appPromise = isRequireable(app) ? Promise.resolve() : loadResources(app);

  return appPromise
    .then(() => Promise.resolve().then(() => {
      const requiredApp = require(app);

      return typeof requiredApp.getInitialState === 'function' ?
        requiredApp.getInitialState(props) : {};
    })
    .then(initialState => {
      const requiredApp = require(app);

      return typeof requiredApp.configureStore === 'function' ?
        requiredApp.configureStore(props) : false;
    }))
    .catch(err => {
      throw new Error(err);
    });
}
