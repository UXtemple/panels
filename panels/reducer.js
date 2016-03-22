import { LOAD, TOGGLE_EXPAND, UPDATE_SETTINGS } from './actions';

export default function panels(state={}, action) {
  let nextState = state;
  let nextPanel;
  let id;

  switch(action.type) {
  case LOAD:
    id = action.meta.id;

    if (action.error) {
      nextPanel = {
        error: true,
        isExpanded: false,
        isLoading: false,
        isReady: false,
        message: action.payload
      };
    } else {
      nextPanel = {
        background: action.payload.background,
        isLoading: false,
        isReady: true,
        maxWidth: action.payload.maxWidth,
        props: action.payload.props,
        title: action.payload.title,
        type: action.payload.type,
        width: action.payload.width
      };
    }
    break;

  case TOGGLE_EXPAND:
    id = action.payload.id;

    nextPanel = {
      ...state[id],
      isExpanded: !state[id].isExpanded
    };
    break;

  case UPDATE_SETTINGS:
    id = action.payload.id;
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
