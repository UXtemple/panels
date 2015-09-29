import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import * as appsActions from '../apps/actions';
import * as panelsActions from '../panels/actions';
import * as routerActions from '../router/actions';
import appsReducer from '../apps/reducer';
import configureStore from '../configure-store';
import getFocusPanel from '../panels/get-focus-panel';
import getPanelPathFromRoute from '../router/get-panel-path-from-route';
import include from '../utils/include';
import isRequireable from '../utils/is-requireable';
import pack from '../state/pack';
import panelsReducer from '../panels/reducer';
import React from 'react';
import render from './render';
import Router from '../router/component';
import routerReducer from '../router/reducer';

const HTML = 'text/html';
const GET = 'GET';

export default function panelsMiddleware() {
  return function *(next) {
    if (this.method === GET && this.accepts(HTML)) {
      this.type = HTML;

      const router = routerReducer(undefined, routerActions.navigate(this.href));

      const requireableRoutes = router.routes.filter(route => isRequireable(route.app));

      const panels = requireableRoutes.
        map(panelsActions.load).
        reduce((state, action) => panelsReducer(state, action), undefined);

      let panelsPropsByApp = {};
      requireableRoutes.forEach(route => {
        const panel = {
          path: route.path,
          props: panels[getPanelPathFromRoute(route)]
        };
        panelsPropsByApp[route.app] = include(panel, panelsPropsByApp[route.app])
      });

      const apps = requireableRoutes.
        map(route => route.app).
        reduce((list, app) => include(app, list), []).
        map(app => appsActions.ready(app, panelsPropsByApp[app])).
        reduce((state, action) => appsReducer(state, action), undefined);

      const initialState = {apps, panels, router};

      const store = configureStore(initialState);
      const state = store.getState();

      const appsDomains = Object.keys(state.apps.byDomain);
      const data = pack(state);
      const html = renderToString(
        <Provider store={store}>
          <Router />
        </Provider>
      );

      const focusRoute = state.router.routes[state.router.routes.length - 1];
      const focusApp = state.apps.byDomain[focusRoute.app];
      const focusPanel = getFocusPanel(state.router.routes, state.panels);
      let title = (focusPanel && focusPanel.title) || 'usepanels.com';
      if (typeof title === 'function') {
        title = title(focusApp.store.getState, focusPanel.props);
      }

      this.body = render({apps: appsDomains, data, html, title});
    } else {
      yield next;
    }
  }
}
