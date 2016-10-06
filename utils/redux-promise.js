// redux-promise sequence branch without FSA and with mini-unique-id instead
// of lodash's version
//
// https://github.com/acdlite/redux-promise/blob/sequence/src/index.js
import uniqueId from 'mini-unique-id'

function isPromise(val) {
  return val && typeof val.then === 'function'
}

export default function promiseMiddleware({ dispatch }) {
  return next => action => {
    if (isPromise(action.payload)) {
      const sequenceId = uniqueId()

      dispatch({
        ...action,
        payload: undefined,
        sequence: {
          type: 'start',
          id: sequenceId
        }
      })

      return action.payload.then(
        result => dispatch({
          ...action,
          payload: result,
          sequence: {
            type: 'next',
            id: sequenceId
          }
        }),
        error => dispatch({
          ...action,
          payload: error,
          error: true,
          sequence: {
            type: 'next',
            id: sequenceId
          }
        })
      )
    }

    return next(action)
  }
}
