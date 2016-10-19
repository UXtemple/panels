import configureStore from './configure-store.dev.js'
import renderPanels from './render.js'

export const render = props => (
  renderPanels(configureStore, props)
)

if (!window.panelsDontAutoLoad) {
  window.addEventListener('load', () => {
    window._store = render(window.panels)
  })
}
