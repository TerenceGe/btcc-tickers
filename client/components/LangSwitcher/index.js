import React, { Component } from 'react'
import style from './style.css'

class LangSwitcher extends Component {

  switchLang() {
    let nextLang = this.props.lang === 'en' ? 'zh' : 'en'
    this.props.actions.changeLang(nextLang)
  }

  render() {
    const { lang }  = this.props
    return (
      <div className={style.langSwitcher}>
        <a className={style.zhSelect + (lang === 'zh' ? ' ' + style.active : '')} onClick={::this.switchLang}>中文</a>
        <a className={style.enSelect + (lang === 'en' ? ' ' + style.active : '')} onClick={::this.switchLang}>English</a>
      </div>
    )
  }
}

export default LangSwitcher
