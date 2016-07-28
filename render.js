import { navigate } from './actions';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import * as runtimes from './runtime/index';
import history from './router/history';
import React from 'react';

export default function runtimeRender(configureStore, { runtime = 'Trails', preferredSnapPoint = 90 }) {
  const store = configureStore();
  store.dispatch(navigate(location.href));

  history(store);

  const Runtime = runtimes[runtime];

  render(
    <Provider store={store}>
      <Runtime />
    </Provider>,
    document.getElementById('root')
  );

  return store;
}
