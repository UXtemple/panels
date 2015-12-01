import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import configureStore from '../../configure-store';
import getFocusPanel from '../../panels/get-focus-panel';
import getPanelPathFromRoute from '../../router/get-panel-path-from-route';
import pack from '../../state/pack';
import React from 'react';
import Router from '../../router/component';
import template from './template';

export default function render(initialState) {
  const store = configureStore(initialState);
  const state = store.getState();

  return template({
    apps: Object.keys(state.apps).map(domain => domain),
    data: pack(state),
    html: renderToString(
      <Provider store={store}>
        <Router />
      </Provider>
    ),
    title: getTitle(state)
  });
}

export function getTitle(state) {
  const focusRoute = state.router.routes[state.router.routes.length - 1];
  const focusApp = state.apps[focusRoute.app];
  const focusPanel = getFocusPanel(state.router.routes, state.panels);

  const title = (focusPanel && focusPanel.title) || 'loading...';

  return typeof title === 'function' ? title(focusApp.store.getState, focusPanel.props) : title;
}
