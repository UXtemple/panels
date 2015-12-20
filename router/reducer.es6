import { NAVIGATE, SHOW } from './actions';
import parse from './parse';

export default function routerReducer(state={routes: [], uri: undefined}, action) {
  let nextState = state;

  switch (action.type) {
    case NAVIGATE:
      const { uri } = action.payload;

      nextState = {
        routes: parse(uri),
        uri
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
