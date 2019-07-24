import { URL } from '../config/api'

export default class {
  constructor () {
    this.timestamp = new Date().getTime()
  }

  __xhrDataFactory (url, body, headers = {}, isJson = true, method = 'GET') {
    return new Promise((resolve, reject) => {
      window.fetch(`${URL.fullPath}${url}`,
        {
          method: method,
          body: (isJson ? JSON.stringify(body) : body),
          headers
        })
        .then(res => {
          resolve(res.json())
        })
    })
  }

  __putData (url, body, headers = {}, isJson = true) {
    return this.__xhrDataFactory(url, body, headers, isJson, 'PUT')
  }

  __postData (url, body, headers = {}, isJson = true) {
    return this.__xhrDataFactory(url, body, headers, isJson, 'POST')
  }

  __deleteData (url, body = {}, headers = {}, isJson = true) {
    return this.__xhrDataFactory(url, body, headers, isJson, 'DELETE')
  }

  __getData (url, headers = {}) {
    return new Promise((resolve, reject) => {
      window.fetch(`${URL.fullPath}${url}`,
        {
          method: 'GET',
          headers
        })
        .then(res => {
          resolve(res.json())
        })
    })
  }
}
