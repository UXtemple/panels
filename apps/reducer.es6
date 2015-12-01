import { LOAD } from './actions';

export default function apps(state = {}, action={}) {
  let nextState = state;

  switch (action.type) {
  case LOAD:
    const { app } = action.meta;
    let nextApp;

    if (action.sequence.type === 'start') {
      nextApp = {
        isLoading: true,
        isReady: false
      };
    } else if (action.error) {
      nextApp = {
        ...state[app],
        isLoading: false,
        error: true,
        message: action.payload
      };
    } else {
      nextApp = {
        ...state[app],
        isLoading: false,
        isReady: true,
        store: action.payload
      };
    }

    nextState = {
      ...state,
      [app]: nextApp
    };
    break;

    default: break;
  }

  return nextState;
}
