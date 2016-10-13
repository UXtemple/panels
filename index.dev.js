import configureStore from './configure-store.dev'
import renderPanels from './render'

export const render = props => (
  renderPanels(configureStore, props)
)

if (!window.panelsDontAutoLoad) {
  window.addEventListener('load', () => {
    const store = render(window.panels)

    window._store = store
  })
}
