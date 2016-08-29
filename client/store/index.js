
import { createStore, applyMiddleware } from 'redux'
import combineActionsMiddleware from 'redux-combine-actions'
import promiseMiddleware from 'redux-promise'
import { logger } from '../middleware'
import rootReducer from '../reducers'

export default function configure(initialState) {
  const create = window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore

  const createStoreWithMiddleware = applyMiddleware(logger, promiseMiddleware)(create)

  const store = createStoreWithMiddleware(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
