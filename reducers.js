import { combineReducers } from 'redux';
import { MOVE_LEFT, SET_X, SET_VIEWPORT_WIDTH } from './runtime/actions';
import { NAVIGATE } from './actions';
import { TOGGLE_EXPAND, UPDATE_SETTINGS } from './panels/actions';
import getViewportWidth from './runtime/get-viewport-width';

function apps(state = { byName: {}, items: [] }, action) {
  if (action.type === NAVIGATE &&
      action.sequence.type === 'next' &&
      action.payload.apps.items.length) {
    return {
      byName: {
        ...state.byName,
        ...action.payload.apps.byName
      },
      items: [
        ...state.items,
        ...action.payload.apps.items
      ]
    };
  } else {
    return state;
  }
}

function panels(state = { byId: {}, items: [] }, action) {
  if (action.type === NAVIGATE &&
      action.sequence.type === 'next' &&
      action.payload.panels.items.length) {
    return {
      byId: {
        ...state.byId,
        ...action.payload.panels.byId
      },
      items: [
        ...state.items,
        ...action.payload.panels.items
      ]
    };
  } else if (action.type === UPDATE_SETTINGS) {
    return {
      ...state,
      byId: action.payload.nextPanelsById
    };
  } else {
    return state;
  }
}

function router(state = { isLoading: true, routes: { byContext: {}, items: [] } }, action) {
  switch (action.type) {
    case NAVIGATE:
      if (action.sequence.type === 'start') {
        return {
          ...state,
          isLoading: true,
          uri: action.meta.uri
        };
      } else if (action.sequence.type === 'next') {
        return {
          ...state,
          ...action.payload.router,
          isLoading: false
        };
      }
      break;

    case SET_VIEWPORT_WIDTH:
    case TOGGLE_EXPAND:
      return {
        ...state,
        routes: {
          items: state.routes.items,
          byContext: action.payload.routesByContext
        }
      };
      break;

    case UPDATE_SETTINGS:
      if (action.payload.nextPosition) {
        return {
          ...state,
          routes: {
            items: state.routes.items,
            byContext: action.payload.nextPosition.routesByContext
          }
        };
      } else {
        return state;
      }
      break;

    default: return state;
  }
}

export const MOBILE_THRESHOLD = 720;

// TODO REVERT!
const preferredSnapPoint = typeof window.panelsSnapPoint === 'number' ? window.panelsSnapPoint : 90;
const viewportWidth = getViewportWidth();
const shouldGoMobile = viewportWidth < MOBILE_THRESHOLD;
const snapPoint = shouldGoMobile ? 0 : preferredSnapPoint;

const RUNTIME_DEFAULT_STATE = {
  maxFullPanelWidth: viewportWidth - snapPoint,
  preferredSnapPoint,
  snappedAt: 0,
  snapPoint,
  shouldGoMobile,
  x: 0,
  viewportWidth,
  width: viewportWidth,
  widths: []
};

function runtime(state = RUNTIME_DEFAULT_STATE, action) {
  switch (action.type) {
    case MOVE_LEFT:
    case SET_X:
      return {
        ...state,
        snappedAt: action.payload.snappedAt,
        x: action.payload.x
      };
      break;

    case NAVIGATE:
      if (action.sequence.type === 'next') {
        return {
          ...state,
          maxFullPanelWidth: action.payload.runtime.maxFullPanelWidth,
          regions: action.payload.runtime.regions,
          snappedAt: action.payload.runtime.snappedAt,
          width: action.payload.runtime.width,
          widths: action.payload.runtime.widths,
          x: action.payload.runtime.x
        };
      } else {
        return state;
      }
      break;

    case SET_VIEWPORT_WIDTH:
      return {
        ...state,
        maxFullPanelWidth: action.payload.maxFullPanelWidth,
        shouldGoMobile: action.payload.shouldGoMobile,
        snapPoint: action.payload.snapPoint,
        viewportWidth: action.payload.viewportWidth,
        width: action.payload.width,
        widths: action.payload.widths,
        x: action.payload.x
      };
      break;

    case TOGGLE_EXPAND:
      return {
        ...state,
        width: action.payload.width,
        widths: action.payload.widths,
        x: action.payload.x
      };
      break;

    case UPDATE_SETTINGS:
      if (action.payload.nextPosition) {
        return {
          ...state,
          width: action.payload.nextPosition.width,
          widths: action.payload.nextPosition.widths,
          x: action.payload.nextPosition.x
        };
      } else {
        return state;
      }
      break;

    default: return state;
  }
}

export default combineReducers({
  apps,
  panels,
  router,
  runtime
});
