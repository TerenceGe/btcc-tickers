
import cookie from 'react-cookie'

function getDefaultLang() {
  let nav = window.navigator;
  return cookie.load('btcchina_lang') || (nav.language || nav.browserLanguage || nav.systemLanguage || nav.userLanguage || '').split('-')[0] || 'zh'
}

export default getDefaultLang
