export default function getWidths(widths, shouldGoMobile, viewportWidth) {
  return widths.map(width => (
    shouldGoMobile ? (width < 360 ? width : viewportWidth) : width
  ))
}
