/* eslint-disable new-cap */
import { URL } from '../../config/app'

const Navigo = import('navigo')

const activateNav = async (className) => {
  // set active
  let PubSub = (await import('pubsub-js')).default
  PubSub.publish('MAIN_NAV', className)
}

Navigo.then(routerClass => {
  const router = new routerClass.default(URL.fullPath, true)
  router.on({
    '': () => { },
    '/account/:id/profile': async (params) => {
      activateNav('contacts')
      const __profilePage = (await import('../../pages/profile-section')).default
      return new __profilePage(params).then(res => {
        const __targ = document.querySelector('.ajax-main-section')
        __targ.innerHTML = ''
        __targ.append(res)
      })
    }
  }).resolve()
})
