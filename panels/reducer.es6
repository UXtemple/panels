import { LOAD } from './actions';

export default function panels(state={}, action) {
  switch(action.type) {
    case LOAD:
      return {
        ...state,
        [action.payload.panel]: {
          background: action.payload.background,
          isLoading: false,
          isReady: true,
          props: action.payload.props,
          title: action.payload.title,
          Type: action.payload.Type
        }
      };
    default: return state;
  }
}
