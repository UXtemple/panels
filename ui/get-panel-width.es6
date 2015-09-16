import DEFAULT from './default-panel-width';
import getViewportWidth from './get-viewport-width';

const MINIMUM = 0.75 * DEFAULT;
const PREFERRED = 2 * DEFAULT;

export default function getPanelWidth() {
  const viewportWidth = getViewportWidth();

  return viewportWidth >= PREFERRED || viewportWidth < MINIMUM ? DEFAULT : viewportWidth;
}
