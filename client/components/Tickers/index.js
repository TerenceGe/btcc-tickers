import React, { Component } from 'react'
import style from './style.css'
import PriceTicker from '../PriceTicker'
import VolumeTicker from '../VolumeTicker'
import { FormattedMessage } from 'react-intl'

class Tickers extends Component {
  render() {
    const { data }  = this.props
    return (
      <div className={style.tickers}>
        <div className={style.priceTickers}>
          <PriceTicker market='BTC / CNY' lastPrice={data.get('ticker_btccny').get('last')} preClosePrice={data.get('ticker_btccny').get('prev_close')} />
          <PriceTicker market='LTC / CNY' lastPrice={data.get('ticker_ltccny').get('last')} preClosePrice={data.get('ticker_ltccny').get('prev_close')} />
        </div>
        <div className={style.volumeTickers}>
          <VolumeTicker labelText={<FormattedMessage id='ticker_btc_volume_label' />} volume={data.get('ticker_btccny').get('vol')} />
          <VolumeTicker labelText={<FormattedMessage id='ticker_ltc_volume_label' />} volume={data.get('ticker_ltccny').get('vol')} />
        </div>
      </div>
    )
  }
}

export default Tickers
