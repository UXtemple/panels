import { navigate } from './actions';

// TODO as middleware
export default function history(store) {
  const navigateHandler = () => store.dispatch(navigate(location.href));

  window.addEventListener('popstate', navigateHandler);

  const unsubscribe = store.subscribe(() => {
    const { uri } = store.getState().router;

    if (uri !== location.href) {
      window.history.pushState(null, null, uri);
    }
  });

  return function historyOff() {
    window.removeEventListener('popstate', navigateHandler);
    unsubscribe();
  }
}
