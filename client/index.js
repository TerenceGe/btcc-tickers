import React from 'react'
import ReactDOM from 'react-dom'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import configure from './store'

import 'bootstrap/dist/css/bootstrap.min.css'

import App from './containers/App'
import ConnectedIntlProvider from './components/ConnectedIntlProvider'

const store = configure()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedIntlProvider>
      <Router history={history}>
        <Route path="/" component={App} />
      </Router>
    </ConnectedIntlProvider>
  </Provider>,
  document.getElementById('root')
)
