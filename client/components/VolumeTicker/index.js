import React from 'react'
import style from './style.css'
import { FormattedMessage, FormattedNumber } from 'react-intl'

const VolumeTicker = ({ labelText, volume }) =>
  <div className={style.volumeTicker}>
    <div className={style.labelText}>{labelText} <FormattedMessage id='ticker_trading_volume_label' /></div>
    <div className={style.volume}><FormattedNumber value={volume} minimumFractionDigits={0}  maximumFractionDigits={0}/></div>
  </div>

export default VolumeTicker
