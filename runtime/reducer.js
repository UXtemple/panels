import { MOVE_LEFT, RESET, SET_X } from './actions';
import { LOAD, TOGGLE_EXPAND, UPDATE_SETTINGS } from '../panels/actions';
import getViewportWidth from './get-viewport-width';

const DEFAULT = {
  regions: [],
  shouldReset: false,
  shouldGoMobile: true,
  x: 0,
  viewportWidth: getViewportWidth(),
  width: 0,
  widths: []
};

export default function runtimeReducer(state=DEFAULT, action) {
  let nextState = state;

  switch (action.type) {
  case RESET:
    nextState = {
      ...state,
      ...action.payload,
      shouldReset: false
    };
    break;

  case MOVE_LEFT:
  case SET_X:
    nextState = {
      ...state,
      x: action.payload.x
    };
    break;

  case LOAD:
  case TOGGLE_EXPAND:
  case UPDATE_SETTINGS:
    nextState = {
      ...state,
      shouldReset: true
    };
    break;

  default: break;
  }

  return nextState;
}
