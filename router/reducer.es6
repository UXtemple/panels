import { NAVIGATE } from './actions';
import parse from './parse';

export default function routerReducer(state={routes: [], uri: undefined}, action) {
  const uri = action.payload && action.payload.uri;

  switch (action.type) {
    case NAVIGATE:
      return {
        routes: parse(uri),
        uri
      };
    default: return state;
  }
}
