import { MOVE_LEFT, RESET, SET_X } from './actions';

const DEFAULT = {
  halves: [],
  regions: [],
  shouldGoMobile: true,
  x: 0,
  width: 0,
  widths: []
};

export default function runtimeReducer(state=DEFAULT, action) {
  let nextState = state;

  switch (action.type) {
  case RESET:
    nextState = {
      ...state,
      ...action.payload
    };
    break;

  case MOVE_LEFT:
  case SET_X:
    nextState = {
      ...state,
      x: action.payload.x
    };
    break;

  default: break;
  }

  return nextState;
}
