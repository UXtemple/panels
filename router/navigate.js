import normaliseUri from 'panels-normalise-uri';
import parse from './parse';

export default function navigate(rawUri, currentFocus, nextFocus, nextContext) {
  const uri = normaliseUri(rawUri);
  const routes = parse(uri);

  let focus = currentFocus + nextFocus;
  if (!(focus >= 0 && focus < routes.length)) {
    focus = routes.length - 1;
  }

  let context = focus - nextContext;
  if (!(context >= 0 && context < focus)) {
    context = 0;
  }

  // TODO review because there might be an issue with sliced panels taking up logical space
  // and not physical one
  return {
    context,
    focus,
    routes,
    uri
  };
}
