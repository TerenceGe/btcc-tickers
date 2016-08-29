
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import locales from './locales'
import tickers from './tickers'

export default combineReducers({
  routing,
  locales,
  tickers
})
