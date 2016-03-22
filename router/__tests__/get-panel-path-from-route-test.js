import getPanelPathFromRoute from '../get-panel-path-from-route';
import test from 'tape';

test('#getPanelPathFromRoute', t => {
  t.equal(
    getPanelPathFromRoute({
      app: 'app.com',
      path: '/'
    }),
    'app.com/'
  );

  t.end();
});
