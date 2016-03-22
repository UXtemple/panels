import { combineReducers } from 'redux';
import apps from './apps/reducer';
import panels from './panels/reducer';
import router from './router/reducer';
import runtime from './runtime/reducer';

export default combineReducers({
  apps,
  panels,
  router,
  runtime
});
