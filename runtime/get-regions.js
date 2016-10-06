import getHalves from './get-halves'
import sum from '../utils/sum'

export default function getRegions(widths) {
  const halves = getHalves(widths)

  return widths.map((_, i) => {
    const to = (i * 2) + 1
    return halves.slice(0, to).reduce(sum, 0)
  })
}
