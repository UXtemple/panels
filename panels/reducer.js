import { LOAD, TOGGLE_EXPAND, UPDATE_SETTINGS } from './actions';

export default function panels(state={byId: {}, items: []}, action) {
  let nextItems = state.items;
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
        isLoading: false,
        isReady: true,
        maxWidth: action.payload.maxWidth,
        props: action.payload.props,
        styleBackground: action.payload.styleBackground,
        title: action.payload.title,
        type: action.payload.type,
        width: action.payload.width
      };
      nextItems = [...state.items, id];
    }
    break;

  case TOGGLE_EXPAND:
    id = action.payload.id;

    nextPanel = {
      ...state.byId[id],
      isExpanded: !state.byId[id].isExpanded
    };
    break;

  case UPDATE_SETTINGS:
    id = action.payload.id;

    nextPanel = {
      ...state.byId[id],
      ...action.payload.settings
    };
    break;

  default: break;
  }

  if (nextPanel) {
    nextState = {
      byId: {
        ...state.byId,
        [id]: nextPanel
      },
      items: nextItems
    };
  }

  return nextState;
}
