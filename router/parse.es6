import normalize from '../utils/normalize-path';
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
      let path = normalize(parsed.pathname);

      if (PROTOCOL_REGEX.test(parsed.pathname)) {
        path = parsed.pathname.split(PROTOCOL_REGEX)[0];
        nextUri = parsed.pathname.replace(path, '');
      } else {
        nextUri = undefined;
      }

      const base = `${parsed.protocol}//${parsed.host}`;
      const context = panels.length > 0 ? panels[panels.length - 1].context : '';

      // Get every path 'bit' which is indeed every panel we need to load
      let pathPanels = [];
      let visible = true;
      do {
        path = path.split('/');
        const lastBit = path.length > 1 ? path[path.length - 2] : '';
        path = path.slice(0, path.length - 1).join('/');
        const hasSliceEndMarkerForRoot = lastBit.indexOf(SLICE_END) === 0;
        const hasSliceEndMarker = !hasSliceEndMarkerForRoot && lastBit.indexOf(SLICE_END) > -1;
        const hasSliceStartMarker = lastBit.indexOf(SLICE_START) > -1;

        visible = hasSliceEndMarker || hasSliceStartMarker ? false : visible;

        pathPanels.push({
          app: parsed.host,
          context: `${context}${base}${withTrailingSlash(path)}`,
          path: path.replace(SLICE_MARKERS, '') || '/',
          visible
        });

        visible = hasSliceEndMarkerForRoot ? false : (hasSliceStartMarker ? true : visible);
      } while (path.length);

      panels = panels.concat(pathPanels.reverse());
    } else {
      nextUri = undefined;
    }
  } while (nextUri);

  return panels;
}
