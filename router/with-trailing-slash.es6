const TRAILING_SLASH_REGEX = /\/$/;

export default function withTrailingSlash(uri) {
  return TRAILING_SLASH_REGEX.test(uri) ? uri : `${uri}/`;
}
