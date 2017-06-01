const TRAILING_SLASH_REGEX = /\/$/

export default uri => (TRAILING_SLASH_REGEX.test(uri) ? uri : `${uri}/`)
