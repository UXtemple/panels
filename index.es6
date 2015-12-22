import 'whatwg-fetch';
import 'core-js/modules/es6.array.find-index';
import { navigate } from './router/actions';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configure-store';
import history from './router/history';
import React from 'react';
import Runtime from './runtime/component';
import routerReducer from './router/reducer';
import unpack from './unpack';

if (!window.Promise) {
  require('native-promise-only');
}

const initialState = typeof window.__panels__ === 'undefined' ?
  {router: routerReducer({}, navigate(location.href))} :
  unpack(window.__panels__);

const store = configureStore(initialState);

window.$ps = store;

history(store);

render(
  <Provider store={store}>
    <Runtime preferredSnapPoint={90} />
  </Provider>,
  document.getElementById('root')
);
