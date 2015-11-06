import { getPanelsPropsByApp } from './panels';
import include from '../../utils/include';
import isRequireable from '../../utils/is-requireable';

export default function getApps(requireableRoutes, panels) {
  const panelsPropsByApp = getPanelsPropsByApp(requireableRoutes, panels);

  const promises = requireableRoutes.
    map(route => route.app).
    reduce((list, app) => include(app, list), [])
    .map(app =>
      isRequireable(app) ?
        Promise.resolve()
          .then(() => require(app).getInitialState(panelsPropsByApp[app]))
          .then(initialState => ({
            app,
            isLoading: false,
            isReady: true,
            store: require(app).configureStore(initialState)
          })) :
        Promise.resolve().then(() => ({
          app,
          isLoading: false,
          isReady: false
        })));

  return Promise.all(promises)
    .then(appsList => {
      const apps = {};

      appsList.forEach(rawApp => {
        const { app, ...rest} = rawApp;
        apps[app] = rest;
      });

      return apps;
    });
}
