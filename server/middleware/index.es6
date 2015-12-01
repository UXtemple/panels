import getRouter, { getRequireableRoutes } from './router';
import getPanels from './panels';
import getApps from './apps';
import render from './render';
import template from './template';

const HTML = 'text/html';
const GET = 'GET';

export default function panelsMiddleware({heapId, prerender = true}) {
  return function *(next) {
    if (this.method === GET && this.accepts(HTML)) {
      this.type = HTML;

      if (prerender) {
        const router = getRouter(this.href);
        const requireableRoutes = getRequireableRoutes(router);
        const panels = getPanels(requireableRoutes);
        const apps = yield getApps(requireableRoutes, panels);

        this.body = render({apps, panels, router}, heapId);
      } else {
        this.body = template();
      }
    } else {
      yield next;
    }
  }
}
