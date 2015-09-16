import Url from 'lite-url';

const TRAILING_SLASH_REGEX = /\/$/;
const PROTOCOL_REGEX = /https?:\/\//;

function trailingSlash(uri) {
  return TRAILING_SLASH_REGEX.test(uri) ? uri : `${uri}/`;
}

export default function parse(uri) {
  let panels = [];
  // Make sure we always have a trailing slash on the URI
  let nextUri = trailingSlash(uri);

  do {
    const parsed = new Url(nextUri);

    if (parsed && parsed.protocol && parsed.host) {
      let path = parsed.pathname;

      if (PROTOCOL_REGEX.test(parsed.pathname)) {
        path = parsed.pathname.split(PROTOCOL_REGEX)[0];
        nextUri = parsed.pathname.replace(path, '');
      } else {
        nextUri = undefined;
      }

      // Get every path 'bit' which is indeed every panel we need to load
      let pathBits = [];
      do {
        path = path.split('/');
        path = path.slice(0, path.length - 1).join('/');
        pathBits.push(path || '/');
      } while(path.length);
      const uniquePathBits = new Set(pathBits.sort());
      // TODO Should we bring the query bit in?
      uniquePathBits.forEach(bit => panels.push(`${parsed.protocol}//${parsed.host}${bit}`));
    } else {
      nextUri = undefined;
    }
  } while(nextUri);

  let contexts = [];
  panels.reduce((prev, panel, i) => {
    const lastFwdSlash = panel.lastIndexOf('/') + 1;
    const sharesRoot = new RegExp(`${panel.substr(0, lastFwdSlash)}$`);
    return contexts[i] = trailingSlash(prev + (sharesRoot.test(prev) ? panel.substr(lastFwdSlash, panel.length) : panel));
  }, '');

  return panels.map((uri, i) => {
    const parsed = new Url(uri);

    return {
      app: parsed.host,
      context: contexts[i],
      path: parsed.pathname,
      uri
    };
  });
}
