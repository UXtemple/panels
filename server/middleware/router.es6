import * as routerActions from '../../router/actions';
import isRequireable from '../../utils/is-requireable';
import routerReducer from '../../router/reducer';

export default function getRouter(uri) {
  return routerReducer(undefined, routerActions.navigate(uri));
}

export function getRequireableRoutes(router) {
  return router.routes.filter(route => isRequireable(route.app))
}
