// original src: https://github.com/substack/path-browserify
import normaliseArray from './normalise-array.js'

export default function normalisePath(rawPath) {
  const isAbsolute = rawPath.charAt(0) === '/'
  const trailingSlash = rawPath.substr(-1) === '/'

  // normalise the path
  let path = normaliseArray(rawPath.split('/')
    .filter(p => !!p), !isAbsolute)
    .join('/')

  if (!path && !isAbsolute) {
    path = '.'
  }
  if (path && trailingSlash) {
    path += '/'
  }

  return (isAbsolute ? '/' : '') + path
}
