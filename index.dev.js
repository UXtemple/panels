import configureStore from './configure-store.dev'
import render from './render'

window.addEventListener('load', () => {
  const store = render(configureStore, window.panels || {})

  window._store = store
})
