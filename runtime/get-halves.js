export default function getHalves(widths) {
  const halves = []

  widths.forEach(width => {
    const half = width / 2

    halves.push(half)
    halves.push(half)
  })

  return halves
}
