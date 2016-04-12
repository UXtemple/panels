import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import promiseMiddleware from './utils/redux-promise';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';

const loggerMiddleware = createLogger({
  collapsed: true,
  duration: true
});

const middleware = applyMiddleware(
  thunkMiddleware,
  promiseMiddleware,
  loggerMiddleware
);

export default function configureStore(state) {
  return createStore(
    rootReducer,
    state,
    middleware
  );
}
