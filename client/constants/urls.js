import { enviroment } from './env.js'

let getUrls = (enviroment) => {
  switch (enviroment) {
    case 'development':
      return {
        API_URL: 'https://data.btcc.com/data'
      }
      break;
    case 'staging':
      return {
        API_URL: 'https://data.btcc.com/data'
      }
      break
    case 'production':
      return {
        API_URL: 'https://data.btcc.com/data'
      }
      break
    default:
      return {
        API_URL: 'https://data.btcc.com/data'
      }
  }
}

export const { API_URL } = getUrls(enviroment)
