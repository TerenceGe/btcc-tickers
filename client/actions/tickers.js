
import { createAction } from 'redux-actions'
import * as api from '../utils/api'

export const getTickers = createAction('get tickers', api.getTickers)
