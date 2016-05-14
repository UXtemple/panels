import configureStore from './configure-store.dev';
import render from './runtime/render';

window.addEventListener('load', () => {
  const store = render(configureStore);

  window._store = store;
});
