/* eslint-disable new-cap */
import * as Msal from 'msal'
import config from '../../../config/msal'
import CWPConfig from '../../../config/cwp'

const URL = import('../../../utils/xhr')
const profiler = import('../../../mixins/profiler')

export default class {
  constructor (opt = {}) {
    this.__opt = opt
    this.__config = config
    this.timestamp = new Date().getTime()
    this.xhr = {}
    return this.render()
  }

  async create (opt, headers) {
    this.xhr = new (await URL).default()
    return this.xhr.__postData(`contact/research`, opt, headers, false)
  }

  __load () {
    this.targ.disabled = 'disabled'
    this.targ.innerText = 'Authenticating . . .'
    this.msalInstance.loginRedirect(this.loginRequest)
  }

  async __loginOnPremise (opt, header) {
    this.xhr = new (await URL).default()
    return this.xhr.__postData(`auth/o365`, opt, {})
  }

  authRedirectCallBack (error, response) {
    if (error) {
      console.log(error)
    } else {
      if (response.tokenType === 'access_token') {
        // callMSGraph(graphConfig.graphMeEndpoint, response.accessToken, graphAPICallback);
      } else {
        // window.stop()
        console.log('token type is:' + response.tokenType)
        console.log(response.idToken)
      }
    }
  }

  loginOnPremise (data) {
    profiler.then(res => {
      // set payload with CWP (Contacts Web Portal) app credentials
      let payload = {
        client_id: CWPConfig.id,
        id: data.id,
        mail: data.mail,
        data
      }
      this.__loginOnPremise(payload).then(o365 => {
        if (!o365.access_token) return
        // load data and reload browser
        return (new res.default().set(data)) | (new res.default().setAccessToken(o365.access_token)) | window.location.reload()
      })
    })
  }

  getGraph (token) {
    window.fetch('https://graph.microsoft.com/beta/me/', {
      headers: { 'Authorization': 'Bearer ' + token },
      method: 'GET' }
    ).then(response => response.json()).catch((err) => {
      console.log('Oops Something went wrong. Please try again later')
      console.log(err)
    }).then(data => {
      // auth to onpremise
      if (data.id) {
        this.loginOnPremise(data)
      }
    })
  }

  loggerCallback (logLevel, message, containsPii) {
    console.log(message)
  }

  bind () {
    const __proto__ = Object.create(this)
    this.__opt.root = this.__opt.root || document
    this.targ = this.__opt.root.querySelector(this.__opt.target)
    this.msalConfig = {
      auth: {
        clientId: this.__config.clientId,
        authority: this.__config.authority
      },
      system: {
        logger: {
          localCallback: this.loggerCallback,
          level: Msal.LogLevel.Verbose,
          piiLoggingEnabled: true,
          correlationId: '1234',
          logMessage: this.loggerCallback,
          executeCallback: this.loggerCallback,
          errorPii: () => {},
          error: () => {},
          warning: () => {},
          warningPii: () => {},
          info: () => {},
          infoPii: () => {},
          verbose: () => {},
          verbosePii: () => {}
        }
      }
    }

    this.msalInstance = new Msal.UserAgentApplication(this.msalConfig)

    this.msalInstance.handleRedirectCallback(this.authRedirectCallBack.bind(this))

    this.loginRequest = {
      scopes: ['user.read'] // optional Array<string>
    }

    this.msalInstance.acquireTokenSilent(this.loginRequest).then((accessTokenResponse) => {
      // Acquire token silent success
      // call API with token
      let accessToken = accessTokenResponse.accessToken
      this.getGraph(accessToken)
    }).catch(function (error) {
      // Acquire token silent failure, send an interactive request.
      console.log(error)
      if (error.errorMessage.indexOf('interaction_required') !== -1) {
        // this.msalInstance.acquireTokenRedirect(accessTokenRequest)
      }
    })

    // login btn
    if (this.targ) this.targ.addEventListener('click', this.__load.bind(__proto__))
  }

  render () {
    this.bind()
    return this
  }
}
