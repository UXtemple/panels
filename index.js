import configureStore from './configure-store'
import renderPanels from './render'

export const render = props => (
  renderPanels(configureStore, props)
)

if (!window.panelsDontAutoLoad) {
  window.addEventListener('load', () => {
    render(window.panels)
  })
}
