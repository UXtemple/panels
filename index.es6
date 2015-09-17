import { navigate } from './router/actions';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import appsLoader from './apps/loader';
import configureStore from './configure-store';
import history from './router/history';
import React from 'react';
import Router from './router/component';
import routerReducer from './router/reducer';
import unpack from './state/unpack';

const initialState = typeof window.__panels__ === 'undefined' ?
  {router: routerReducer({}, navigate(location.href))} :
  unpack(window.__panels__);

const store = configureStore(initialState);

appsLoader(store);
history(store);

render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
);
