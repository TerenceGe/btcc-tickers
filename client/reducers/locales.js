
import { handleActions } from 'redux-actions'
import cookie from 'react-cookie'
import getDefaultLang from '../utils/lang.js'

import enLocales from '../resources/locales/en.js'
import zhLocales from '../resources/locales/zh.js'

const locales = {
  en: enLocales,
  zh: zhLocales
}

let lang = getDefaultLang()

const initialState = {
  lang,
  messages: locales[lang]
}

export default handleActions({
  'change lang' (state, action) {
    return {
      lang: action.payload,
      messages: locales[action.payload]
    }
  }
}, initialState)
