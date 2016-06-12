import Url from 'lite-url';
import withTrailingSlash from './with-trailing-slash';

const PROTOCOL_REGEX = /https?:\/\//;
const SLICE_END = ')';
const SLICE_START = '(';
const SLICE_MARKERS = new RegExp(`[${SLICE_START}${SLICE_END}]`, 'g');

export default function parse(uri) {
  let routes = [];
  // Make sure we always have a trailing slash on the URI
  let nextUri = withTrailingSlash(uri);

  let i = 0;

  do {
    const parsed = new Url(nextUri);

    if (parsed && parsed.protocol && parsed.host) {
      let path = parsed.pathname;

      nextUri = undefined;

      if (PROTOCOL_REGEX.test(parsed.pathname)) {
        path = parsed.pathname.split(PROTOCOL_REGEX)[0];
        nextUri = parsed.pathname.replace(path, '');
      }

      const base = `${parsed.protocol}//${parsed.host}`;
      const context = routes.length > 0 ? routes[routes.length - 1].context : '';

      // Get every path 'bit' which is indeed every panel we need to load
      let pathRoute = [];
      let visible = true;
      do {
        path = path.split('/');
        const lastBit = path.length > 1 ? path[path.length - 2] : '';
        path = path.slice(0, path.length - 1).join('/');
        const hasSliceEndMarkerForRoot = lastBit.indexOf(SLICE_END) === 0;
        const hasSliceEndMarker = !hasSliceEndMarkerForRoot && lastBit.indexOf(SLICE_END) > -1;
        const hasSliceStartMarker = lastBit.indexOf(SLICE_START) > -1;

        visible = hasSliceEndMarker || hasSliceStartMarker ? false : visible;

        pathRoute.push({
          app: parsed.host,
          context: `${context}${base}${withTrailingSlash(path)}`,
          path: path.replace(SLICE_MARKERS, '') || '/',
          visible
        });

        visible = hasSliceEndMarkerForRoot ? false : (hasSliceStartMarker ? true : visible);
      } while (path.length);
      routes = routes.concat(pathRoute.reverse());
    } else {
      nextUri = undefined;
    }
  } while (nextUri);

  return routes;
}
