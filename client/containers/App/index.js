
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import style from './style.css'
import * as LocaleActions from '../../actions/locales'
import * as TickerActions from '../../actions/tickers'
import Tickers from '../../components/Tickers'
import LangSwitcher from '../../components/LangSwitcher'
import fontStyle from '../../resources/fonts/fonts.css'
import logo from '../../resources/images/btcc_logo_white.svg'

class App extends Component {

  componentDidMount() {
    setInterval(() => {
      this.props.actions.getTickers()
    }, 1000)
  }

  render() {
    const { lang, tickers, actions, children } = this.props
    return (
      <div>
        <div className={style.mainContent}>
          {
            tickers.size > 0 ?
              <div>
                <div className={style.logo}><img src={logo} /></div>
                <Tickers data={tickers} />
                <LangSwitcher lang={lang} actions={actions} />
              </div>
            :
              'loading..'
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    lang: state.locales.lang,
    tickers: state.tickers.get('content')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...LocaleActions, ...TickerActions}, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
