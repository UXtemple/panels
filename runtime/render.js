import { navigate } from '../actions';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import history from '../router/history';
import React from 'react';
import Runtime from './component';

export default function runtimeRender(configureStore, preferredSnapPoint = 90) {
  const store = configureStore();
  store.dispatch(navigate(location.href));

  history(store);

  render(
    <Provider store={store}>
      <Runtime />
    </Provider>,
    document.getElementById('root')
  );

  return store;
}
