import 'isomorphic-fetch'
import es6promise from 'es6-promise'
es6promise.polyfill();
import { API_URL } from '../constants/urls.js'
import { enableLog } from '../constants/log.js'

const getTickers = async (market='all') => {
  return await fetch(`${API_URL}/ticker?market=${market}`).then((response) => {
    if (response.status >= 400 && enableLog) {
      handleError(response)
    }
    return response.json()
  }).then((response) => {
    if(response.result) {
      return response.result
    }
    return response
  }).catch((error) => {
    if(enableLog) {
      console.log(error)
    }
  })
}

const handleError = (response) => {
  switch(response.status) {
    case 401:
      console.log('authentication failed')
      break
    case 417:
      console.log('token expired')
      break
    default:
      console.log('request failed')
  }
  throw new Error(response.statusText)
}

export {
  getTickers
}
