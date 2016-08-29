
import { handleActions, handleAction } from 'redux-actions'
import { Map } from 'immutable'

const initialState = Map({
  sequence: 'next',
  content: Map({})
})

export default handleActions({
  'get tickers' (state, action) {
    if(!action.payload) {
      return state.update('sequence', v => action.sequence.type)
    }
    return Map({
      sequence: action.sequence.type,
      content: Map({
        ticker_btccny: Map(action.payload.ticker_btccny),
        ticker_ltccny: Map(action.payload.ticker_ltccny)
      })
    })
  }
}, initialState)
