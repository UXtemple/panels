import configureStore from './configure-store.dev';
import render from './runtime/render';

window.addEventListener('load', () => {
  const store = render(configureStore, window.panelsSnapPoint);

  window._store = store;
});
