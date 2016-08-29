import React, { Component } from 'react'
import style from './style.css'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import classnames from 'classnames'

class PriceTicker extends Component {
  render() {
    const { market, lastPrice, preClosePrice }  = this.props
    const trendClasses = classnames(
      style.trend,
      { [style.increse]: preClosePrice < lastPrice, [style.decline]: preClosePrice > lastPrice }
    )
    return (
      <div className={style.priceTicker}>
        <div className={style.market}>{market}</div>
        <div className={style.lastPrice}><FormattedNumber value={lastPrice} minimumFractionDigits={2}  maximumFractionDigits={2}/></div>
        <div className={trendClasses}><div><FormattedNumber value={((lastPrice-preClosePrice)/preClosePrice)*100} minimumFractionDigits={2}  maximumFractionDigits={2}/>%</div></div>
      </div>
    )
  }
}

export default PriceTicker
