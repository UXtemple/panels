import { NAVIGATE, SHOW } from './actions';

export default function routerReducer(state={ routes: [] }, action) {
  switch (action.type) {
    case NAVIGATE:
      return {
        context: action.payload.context,
        focus: action.payload.focus,
        routes: action.payload.routes,
        uri: action.payload.uri
      };

    case SHOW:
      return {
        ...state,
        routes: state.routes.map(route => (
          action.payload.context === route.context ?
            {...route, visible: true} :
            route
        ))
      };

    default: return state;
  }
}
