import { render } from 'react-dom';
import { Provider } from 'react-redux';
import history from '../router/history';
import navigate from '../router/navigate';
import React from 'react';
import Runtime from './component';

export default function runtimeRender(configureStore, preferredSnapPoint = 90) {
  const store = configureStore({
    router: navigate(window.location.href)
  });

  history(store);

  render(
    <Provider store={store}>
      <Runtime preferredSnapPoint={preferredSnapPoint} />
    </Provider>,
    document.getElementById('root')
  );

  return store;
}
