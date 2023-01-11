import axios from 'axios'
import Logger from '@/lib/logger'

// this code is used to debug axios requests
axios.interceptors.request.use((request) => {
  Logger.debug('Starting Request', JSON.stringify(request, null, 2))
  return request
})
axios.interceptors.response.use((response) => {
  // Logger.debug('Response:', JSON.stringify(response, null, 2))
  return response
})

export default class ApiRequest {
  constructor (config) {
    this.config = config
  }

  static get (url, config) {
    Logger.debug(`get API Request called: ${url}`, 'api-request')
    return axios.get(url, config)
  }

  static post (url, data, config) {
    Logger.debug(`post API Request called: ${url}`, 'api-request')
    return axios.post(url, data, config)
  }

  static delete (url, config) {
    Logger.debug(`delete API Request called: ${url}`, 'api-request')
    return axios.delete(url, config)
  }

  static put (url, data, config) {
    Logger.debug(`put API Request called: ${url}`, 'api-request')
    return axios.put(url, data, config)
  }

  static request (config) {
    Logger.debug(`request API called: ${config.url}`, 'api-request')
    return axios.request(config)
  }

  static head (url, config) {
    Logger.debug(`head request API called: ${url}`, 'api-request')
    return axios.head(url, config)
  }

  static options (url, config) {
    Logger.debug(`options request API called: ${url}`, 'api-request')
    return axios.options(url, config)
  }

  static patch (url, data, config) {
    Logger.debug(`patch request API called: ${url}`, 'api-request')
    return axios.patch(url, data, config)
  }
}
