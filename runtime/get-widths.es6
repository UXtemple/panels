export default function getWidths(widths, shouldGoMobile, viewportWidth) {
  return widths.map(width => shouldGoMobile ? viewportWidth : width);
}
