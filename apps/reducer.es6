import { FAILED, LOAD, LOADING, READY } from './actions';
import exclude from '../utils/exclude';
import include from '../utils/include';

export default function apps(state = {byDomain: {}, toLoad: []}, action) {
  const app = action.payload && action.payload.app;

  switch (action.type) {
    case FAILED:
      return {
        ...state,
        byDomain: {
          ...state.byDomain,
          [app]: {
            isLoading: false,
            isReady: false,
            store: {}
          }
        }
      };

    case LOAD:
      return {
        ...state,
        toLoad: include(app, state.toLoad)
      };

    case LOADING:
      return {
        byDomain: {
          ...state.byDomain,
          [action.payload.app]: {
            isLoading: true,
            isReady: false,
            store: {}
          }
        },
        toLoad: exclude(app, state.toLoad)
      };

    case READY:
      return {
        ...state,
        byDomain: {
          ...state.byDomain,
          [action.payload.app]: {
            isLoading: false,
            isReady: true,
            store: action.payload.store
          }
        }
      };

    default: return state;
  }
}
