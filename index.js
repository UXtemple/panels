import configureStore from './configure-store';
import render from './render';

window.addEventListener('load', () => render(configureStore, window.panels || {
  routerWhitelist: [
    '/^https?:\/\/((custom\-url\.com)\/[a-zA-Z0-9\-\_]+)(\/.*)/'
  ]
}));
