import { LOAD, UPDATE_SETTINGS } from './actions';

export default function panels(state={}, action) {
  let nextState = state;
  let nextPanel;
  let id;

  switch(action.type) {
  case LOAD:
    id = action.meta.panel;

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
    break;

  case UPDATE_SETTINGS:
    id = action.payload.panel;
    nextPanel = {
      ...state[id],
      ...action.payload.settings
    };
    break;

  default: break;
  }

  if (nextPanel) {
    nextState = {
      ...state,
      [id]: nextPanel
    };
  }

  return nextState;
}
