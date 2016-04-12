import { navigate } from './router/actions';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configure-store.dev';
import history from './router/history';
import React from 'react';
import Runtime from './runtime/component';
import router from './router/reducer';

window.addEventListener('load', function() {
  const store = configureStore({
    router: router({}, navigate(window.location.href))
  });

  history(store);

  render(
    <Provider store={store}>
      <Runtime preferredSnapPoint={90} />
    </Provider>,
    document.getElementById('root')
  );
});
