import configureStore from './configure-store';
import render from './runtime/render';

window.addEventListener('load', () => render(configureStore, window.panelsSnapPoint));
