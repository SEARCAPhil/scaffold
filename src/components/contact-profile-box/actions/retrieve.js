/* eslint-disable new-cap */
const URL = import('../../../utils/xhr')

export default class {
  constructor (opt = {}) {
    this.timestamp = new Date().getTime()
    this.xhr = {}
    this.__opt = opt
  }

  async get () {
    this.xhr = new (await URL).default()
    return this.xhr.__getData(`contact/${this.__opt.id}/info`, this.__opt.headers)
  }
}
