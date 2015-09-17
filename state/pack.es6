import serialise from 'serialize-javascript';

function packApps(apps) {
  let newApps = {};
  Object.keys(apps).forEach(app => newApps[app] = packApp(apps[app]));
  return newApps;
}

function packApp(app) {
  return {
    ...app,
    store: app.store.getState()
  };
}

export default function pack(state) {
  return serialise({
    apps: {
      byDomain: packApps(state.apps.byDomain),
      toLoad: state.apps.toLoad
    },
    panels: state.panels,
    router: state.router
  });
}
