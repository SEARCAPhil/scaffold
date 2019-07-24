/* eslint-disable new-cap */
import { URL } from './config/app'
import { Middleware } from './mixins/middleware'
import Message from 'vanilla-antd-message/dist/'

const AuthMiddleWare = import('./middlewares/Auth')
const Navigo = import('navigo')
const Profiler = import('./mixins/profiler')

const loadHeader = (opt) => {
  const __header = import('./components/main-header')
  __header.then(Res => {
    const __target = document.querySelector('header')
    return new Res.default(opt).then(html => {
      return __target ? __target.replaceWith(html) : document.body.prepend(html)
    })
  })
}

const loadSidebar = (opt) => {
  const __sidebar = import('./components/main-sidebar')
  const __target = document.querySelector('.main-sidebar')
  __sidebar.then(Res => {
    return new Res.default(opt).then(html => {
      return __target ? __target.replaceWith(html) : document.body.prepend(html)
    })
  })
}

const loadCookieSection = (opt) => {
  const __cookie = import('./components/cookie-notice-section')
  const __target = document.querySelector('.cookie-section')
  __cookie.then(Res => {
    return new Res.default(opt).then(html => {
      return __target ? __target.replaceWith(html) : document.body.append(html)
    })
  })
}

const loadAccountRouters = () => {
  import('./routers/account/')
}
const hideHomePage = () => {
  let targ = document.querySelector('.home-section')
  if (targ) targ.parentNode.removeChild(targ)
}

const loadMain = (opt = {}) => {
  loadHeader(opt)
  loadSidebar(opt)
  loadCookieSection(opt)
  hideHomePage()
  loadGAnalytics(opt.mail, document.body)

  let token = window.localStorage.getItem('adal.access.token.keyhttps://graph.microsoft.com')

  // get image from server if not exists
  if (opt.image) return
  getImage(token).then(res => {
    res.blob().then(blob => {
      // reader
      let reader = new window.FileReader()
      reader.readAsDataURL(blob)
      reader.onloadend = function () {
        Profiler.then(prof => {
          let p = new prof.default()
          if (reader.result.indexOf('data:image') !== -1) {
            // check for valid image
            let data = { ...p.get(), image: reader.result }
            // save image
            p.set(data)
            // reload header
            loadHeader(opt)
          }
        })
      }
    })
  })

  document.querySelector('.wrapper').classList.remove('hidden')
  let loginContainer = document.querySelector('.loginContainer')
  if (loginContainer) loginContainer.remove()
}

const loadLoginPage = () => {
  document.querySelector('.wrapper').classList.add('hidden')
  const loginContainer = document.createElement('main')
  loginContainer.classList.add('loginContainer')

  // hide other section
  let header = document.querySelector('.main-header')
  let sidebar = document.querySelector('.main-sidebar')
  if (header) header.classList.add('hidden')
  if (sidebar) sidebar.classList.add('hidden')

  import('./pages/login-page').then(res => {
    return new res.default().then(html => {
      loginContainer.innerHTML = ''
      loginContainer.append(html)
      if (!document.querySelector('.loginContainer')) document.body.append(loginContainer)
      document.querySelector('.loginContainer').replaceWith(loginContainer)
    })
  })
}

const loadProfile = () => {
  return new Promise((resolve, reject) => {
    Profiler.then(res => {
      let profile = new res.default().get()
      resolve(profile)
    })
  })
}

const getImage = (token) => {
  // https://graph.microsoft.com/v1.0/me/photo/$value
  return window.fetch('https://graph.microsoft.com/v1.0/me/photo/$value', {
    headers: { 'Authorization': 'Bearer ' + token },
    method: 'GET'
  })
}

const loadGAnalytics = (id, targ) => {
  const uid = id || 'Not Set'
  // main script
  const gaMain = document.createElement('script')
  gaMain.src = 'https://www.googletagmanager.com/gtag/js?id=UA-99081752-7'
  gaMain.setAttribute('async', true)
  // tag
  const gaScript = document.createElement('script')
  gaScript.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('set', {'user_id': "${uid}"})
    gtag('config', 'UA-99081752-7');
  `
  if (uid) {
    targ.append(gaMain)
    targ.append(gaScript)
  }
}

const loadHomePage = (opt = {}) => {
  const __page = import('./pages/home-page')
  const __target = document.querySelector('.home-section')
  __page.then(Res => {
    return new Res.default(opt).then(html => {
      return __target ? __target.replaceWith(html) : document.querySelector('.ajax-main-section').prepend(html)
    })
  })
}

let profile = {}
const loadRoutes = () => {
  Navigo.then(routerClass => {
    const router = new routerClass.default(URL.fullPath, true)
    router.on({
      '': async () => {
        profile = await loadProfile()
        if (profile.id) return (window.location.hash = '#/home')
        loadLoginPage()
      },
      '/home': async () => {
        profile = await loadProfile()
        // empty section
        document.querySelector('.ajax-main-section').innerHTML = ''
        loadMain(profile)
        loadHomePage()
      },
      '/account/*': async () => {
        profile = await loadProfile()
        loadMain(profile)
        loadAccountRouters()
      },
      '/login': () => {
        loadLoginPage()
      },
      '/signout': () => {
        Profiler.then(prof => {
          new prof.default().clear()
          window.location = `https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=${window.location.href}`
          setTimeout(() => (window.location.hash = '#/'), 100)
        })
      }

    }).resolve()
  })
}

const MiddleWare = new Middleware()
let auth = AuthMiddleWare.then(middleware => { return new middleware.default() })

MiddleWare.merge([auth]).then((value) => {
  MiddleWare.run(['Auth']).then(() => {
    loadRoutes()
  }).catch(e => {
    loadLoginPage()
  })
})

// service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(registration => {
      console.log('SW registered: ', registration)
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError)
    })
  })

  // on update
  navigator.serviceWorker.controller.onstatechange = function (event) {
    if (event.target.state === 'redundant') {
      if ('controller' in navigator.serviceWorker) {
        import('vanilla-antd-message/dist/style.css').then(res => {
          // update notice style
          let style = document.createElement('style')
          style.innerHTML = `${res.default.toString()}`
          style.async = true
          document.body.append(style)
        })
        // show message then restart the app
        Message.success('A new update is available! To bring the most out of it, we will now restart your application\nRestarting . . . Please wait', 20000)
        setTimeout(() => {
          window.location.reload()
        }, 6000)
      }
    }
  }
}

window.deferredPrompt = {}

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault()
  // Stash the event so it can be triggered later.
  window.deferredPrompt = e
  const __banner = import('./components/install-notice-section')
  const __target = document.querySelector('.install-notice-section')
  __banner.then(Res => {
    return new Res.default().then(html => {
      return __target ? __target.replaceWith(html) : document.body.append(html)
    })
  })
})
