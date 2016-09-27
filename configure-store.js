import { applyMiddleware, createStore } from 'redux'
import notify from './notify'
import promiseMiddleware from './utils/redux-promise'
import rootReducer from './reducers'
import thunkMiddleware from 'redux-thunk'

const middleware = applyMiddleware(
  thunkMiddleware,
  promiseMiddleware,
  notify
)

export default function configureStore(state) {
  return createStore(
    rootReducer,
    state,
    middleware
  )
}
