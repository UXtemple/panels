import { LOAD } from './actions';

export default function panels(state={}, action) {
  let nextState = state;

  switch(action.type) {
  case LOAD:
    let nextPanel;

    if (action.error) {
      nextPanel = {
        error: true,
        isLoading: false,
        isReady: false,
        message: action.payload
      };
    } else {
      nextPanel = {
        background: action.payload.background,
        isLoading: false,
        isReady: true,
        props: action.payload.props,
        title: action.payload.title,
        type: action.payload.type,
        width: action.payload.width
      };
    }

    nextState = {
      ...state,
      [action.meta.panel]: nextPanel
    };
    break;

  default: break;
  }

  return nextState;
}
