// original src: https://github.com/substack/path-browserify
export default function normaliseArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  let up = 0
  for (let i = parts.length - 1; i >= 0; i--) {
    const last = parts[i]
    if (last === '.') {
      parts.splice(i, 1)
    } else if (last === '..') {
      parts.splice(i, 1)
      up++
    } else if (up) {
      parts.splice(i, 1)
      up--
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..')
    }
  }

  return parts
}
