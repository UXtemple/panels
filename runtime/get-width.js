import sum from '../utils/sum'

export default function getPanelsWidth(viewportWidth, snapPoint, widths) {
  return viewportWidth - snapPoint + widths.reduce(sum, 0)
}
