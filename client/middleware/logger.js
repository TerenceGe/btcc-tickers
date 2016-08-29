import { enableLog } from '../constants/log.js'

export default store => next => action  => {
  if(enableLog) {
    console.log(action)
  }
  return next(action)
}
