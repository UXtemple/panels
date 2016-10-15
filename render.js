import { navigate } from './actions'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import * as runtimes from './runtime/index'
import history from './router/history'
import React from 'react'

export default function runtimeRender(configureStore, {
  snap = true,
  runtime = 'Trails',
  // preferredSnapPoint = 90,
  ...initialState
} = {}) {
  const store = configureStore({
    router: {
      routes: {
        byContext: {},
        items: []
      },
      parsers: initialState.router && initialState.router.parsers
    }
  })
  store.dispatch(navigate(location.href))

  history(store)

  const Runtime = runtimes[runtime]

  render(
    <Provider store={store}>
      <Runtime snap={snap} />
    </Provider>,
    document.getElementById('root')
  )

  return store
}
