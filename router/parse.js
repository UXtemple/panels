import Url from 'lite-url';
import withTrailingSlash from './with-trailing-slash';

const PROTOCOL_REGEX = /https?:\/\//;
const SLICE_END = ')';
const SLICE_START = '(';
const SLICE_MARKERS = new RegExp(`[${SLICE_START}${SLICE_END}]`, 'g');

export default function parse(uri) {
  const apps = {
    byName: {},
    items: []
  };
  const routes = {
    byContext: {},
    items: []
  };

  // Make sure we always have a trailing slash on the URI
  let nextUri = withTrailingSlash(uri);

  let i = 0;

  do {
    const parsed = new Url(nextUri);

    if (parsed && parsed.protocol && parsed.host) {
      const app = parsed.host;
      let path = parsed.pathname;

      nextUri = undefined;

      if (PROTOCOL_REGEX.test(parsed.pathname)) {
        path = parsed.pathname.split(PROTOCOL_REGEX)[0];
        nextUri = parsed.pathname.replace(path, '');
      }

      const base = `${parsed.protocol}//${app}`;
      const context = routes.items.length > 0 ? routes.items[routes.items.length - 1] : '';

      // Get every path 'bit' which is indeed every panel we need to load
      let pathRoute = [];
      let isVisible = true;
      do {
        path = path.split('/');
        const lastBit = path.length > 1 ? path[path.length - 2] : '';
        path = path.slice(0, path.length - 1).join('/');
        const hasSliceEndMarkerForRoot = lastBit.indexOf(SLICE_END) === 0;
        const hasSliceEndMarker = !hasSliceEndMarkerForRoot && lastBit.indexOf(SLICE_END) > -1;
        const hasSliceStartMarker = lastBit.indexOf(SLICE_START) > -1;

        if (hasSliceEndMarker || hasSliceStartMarker) {
          isVisible = false;
        }

        const panelPath = path.replace(SLICE_MARKERS, '') || '/';

        const panelId = `${app}${panelPath}`;

        pathRoute.push({
          app,
          context: `${context}${base}${withTrailingSlash(path)}`,
          isVisible,
          panelId,
          path: panelPath
        });

        isVisible = hasSliceEndMarkerForRoot ? false : (hasSliceStartMarker ? true : isVisible);
      } while (path.length);

      if (apps.items.indexOf(app) === -1) {
        apps.items.push(app);
        apps.byName[app] = {
          app,
          panels: []
        };
      }

      pathRoute.reverse().forEach(route => {
        routes.byContext[route.context] = route;
        routes.items.push(route.context);

        if (apps.byName[app].panels.indexOf(route.path) === -1) {
          apps.byName[app].panels.push(route.path);
        }
      });
    } else {
      nextUri = undefined;
    }
  } while (nextUri);

  return {
    apps,
    routes
  };
}
