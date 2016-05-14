import { NAVIGATE, SHOW } from './actions';

export default function routerReducer(state={routes: []}, action) {
  let nextState = state;

  switch (action.type) {
    case NAVIGATE:
      nextState = {
        context: action.payload.context,
        focus: action.payload.focus,
        routes: action.payload.routes,
        uri: action.payload.uri
      };
      break;

    case SHOW:
      nextState = {
        ...state,
        routes: state.routes.map(route => (
          action.payload.context === route.context ?
            {...route, visible: true} :
            route
        ))
      };
      break;

    default: break;
  }

  return nextState;
}
