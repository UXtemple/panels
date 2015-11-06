import { FAILED, LOAD, LOADING, READY } from './actions';
import exclude from '../utils/exclude';
import include from '../utils/include';

export default function apps(state = {}, action={}) {
  let nextState = state;

  switch (action.type) {
    case LOAD:
    const { app } = action.meta;

    if (action.sequence.type === 'start') {
      nextState = {
        ...state,
        [app]: {
          isLoading: false,
          isReady: false
        }
      };
    } else if (action.error) {
      nextState = {
        ...state,
        [app]: {
          ...state[app],
          isLoading: false,
          error: true,
          message: action.payload
        }
      };
    } else {
      nextState = {
        ...state,
        [app]: {
          ...state[app],
          isLoading: false,
          isReady: true,
          store: action.payload
        }
      };
    }
    break;

    default: break;
  }

  return nextState;
}
