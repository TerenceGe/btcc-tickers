import { enviroment } from './env.js'

export const enableLog = (enviroment === 'development') || (enviroment === 'staging')
