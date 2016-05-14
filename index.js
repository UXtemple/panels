import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configure-store';
import history from './router/history';
import navigate from './router/navigate';
import React from 'react';
import Runtime from './runtime/component';

window.addEventListener('load', function() {
  const store = configureStore({
    router: navigate(window.location.href, 0)
  });

  history(store);

  render(
    <Provider store={store}>
      <Runtime preferredSnapPoint={90} />
    </Provider>,
    document.getElementById('root')
  );
});
