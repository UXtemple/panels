import 'core-js/fn/array/find-index';

export default function getIndexOfPanelToShow(at, regions) {
  const index = regions.findIndex(region => at < region);
  return index === -1 ? regions.length - 1 : index;
}
