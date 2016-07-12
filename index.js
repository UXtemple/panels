import configureStore from './configure-store';
import render from './render';

window.addEventListener('load', () => render(configureStore, window.panels));
