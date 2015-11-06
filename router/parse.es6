import Url from 'lite-url';

const PROTOCOL_REGEX = /https?:\/\//;
const SLICE_END = ')';
const SLICE_START = '(';
const SLICE_MARKERS = new RegExp(`[${SLICE_START}${SLICE_END}]`, 'g');
const TRAILING_SLASH_REGEX = /\/$/;

function withTrailingSlash(uri) {
  return TRAILING_SLASH_REGEX.test(uri) ? uri : `${uri}/`;
}

export default function parse(uri) {
  let panels = [];
  // Make sure we always have a trailing slash on the URI
  let nextUri = withTrailingSlash(uri);

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

      const base = `${parsed.protocol}//${parsed.host}`;

      // Get every path 'bit' which is indeed every panel we need to load
      let pathPanels = [];
      let visible = true;
      do {
        path = path.split('/');
        path = path.slice(0, path.length - 1).join('/');
        const hasSliceEndMarker = path.indexOf(SLICE_END) > -1;
        const hasSliceStartMarker = path.indexOf(SLICE_START) > -1;
        path = path.replace(SLICE_MARKERS, '');

        visible = hasSliceEndMarker ? false : visible;

        const bit = path || '/';
        // if (pathPanels.indexOf(bit) === -1) {
        pathPanels.push({
          uri: `${base}${bit}`,
          visible
        });
        // }

        visible = path.indexOf(SLICE_START) > -1 ? true : visible;
      } while (path.length);

      panels = panels.concat(pathPanels.reverse());
    } else {
      nextUri = undefined;
    }
  } while (nextUri);

  let contexts = [];
  panels.reduce((prev, {uri}, i) => {
    const lastFwdSlash = uri.lastIndexOf('/') + 1;
    const sharesRoot = new RegExp(`${uri.substr(0, lastFwdSlash)}$`);
    const contextUri = prev + (sharesRoot.test(prev) ? uri.substr(lastFwdSlash, uri.length) : uri);
    return contexts[i] = withTrailingSlash(contextUri);
  }, '');

  return panels.map((panel, i) => {
    const parsed = new Url(panel.uri);

    return {
      app: parsed.host,
      context: contexts[i],
      path: parsed.pathname,
      uri: panel.uri,
      visible: panel.visible
    };
  });
}
