import findIndex from 'array-find-index';

export default function getIndexOfPanelToShow(at, regions) {
  const index = findIndex(regions, region => at < region);
  return index === -1 ? regions.length - 1 : index;
}
