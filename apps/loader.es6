import { failed, loading, ready } from './actions';
import loadScript from './load-script';
import loadStyle from './load-style';

// TODO FIXME normalise with server/render
const TYPE = process.env.NODE_ENV === 'production' ? 'min' : 'dev';

export default function appLoader(store) {
  return store.subscribe(function appLoaderStoreListener() {
    const { toLoad } = store.getState().apps;

    if (toLoad.length) {
      const app = toLoad[0];

      store.dispatch(loading(app));

      loadScript(`//${app}/${app}.${TYPE}.js`, err => store.dispatch(err ? failed(app) : ready(app)));
      loadStyle(`//${app}/${app}.css`, ::console.error);
    }
  });
}
