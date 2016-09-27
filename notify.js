import { NAVIGATE } from './actions'

export default store => next => action => {
  if (action.type === NAVIGATE) {
    const { apps } = store.getState()

    apps.items.forEach(name => {
      const app = apps.byName[name]

      if (typeof app.notify === 'function') {
        app.notify({
          type: 'NAVIGATE',
          payload: {
            uri: action.meta.uri
          }
        })
      }
    })
  }

  return next(action)
}
