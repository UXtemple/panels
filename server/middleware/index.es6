import getRouter, { getRequireableRoutes } from './router';
import getPanels from './panels';
import getApps from './apps';
import render from './render';

const HTML = 'text/html';
const GET = 'GET';

export default function panelsMiddleware({heapId}) {
  return function *(next) {
    if (this.method === GET && this.accepts(HTML)) {
      this.type = HTML;

      const router = getRouter(this.href);
      const requireableRoutes = getRequireableRoutes(router);
      const panels = getPanels(requireableRoutes);
      const apps = yield getApps(requireableRoutes, panels);

      this.body = render({apps, panels, router}, heapId);
    } else {
      yield next;
    }
  }
}
