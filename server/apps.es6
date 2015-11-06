import include from '../utils/include';

const HTML = 'text/html';
const GET = 'GET';

export default function panelsMiddleware() {
  return function *(next) {
    if (this.method === GET && this.accepts(HTML) && this.panels) {

      const appsPromises = requireableRoutes.
        map(route => route.app).
        reduce((list, app) => include(app, list), [])
        .map(app => {
          const appPromise = Promise.resolve();
          if (isRequireable(app)) {
            appPromise
              .then(() => require(app).getInitialState(panelsPropsByApp[app]))
              .then(initialState => ({
                app,
                isLoading: false,
                isReady: true,
                store: require(app).configureStore(initialState)
              }));
          } else {
            appPromise.then(() => ({
              app,
              isLoading: false,
              isReady: false
            }));
          }
          return appPromise;
        });
        // map(app => appsActions.load(app, panelsPropsByApp[app])).
        // reduce((state, action) => appsReducer(state, action), undefined);

      return Promise.all(appsPromises).then(appsList => {
        const apps = {};
        const appsDomains = [];
        appsList.forEach(rawApp => {
          const { app, ...rest} = rawApp;
          apps[app] = rest;
          domains.push(app);
        });

        const initialState = {apps, panels, router};

