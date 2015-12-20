import getIndexOfPanelToShow from './get-index-of-panel-to-show';
import sum from '../utils/sum';

export default function getXToSnapTo(fromX, regions, widths) {
  const index = getIndexOfPanelToShow(fromX, regions);
  return widths.slice(0, index).reduce(sum, 0);
}
