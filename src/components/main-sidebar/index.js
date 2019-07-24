import style from './index.styl'
import PubSub from 'pubsub-js'

export default class {
  constructor (opt = {}) {
    this.__opt = opt
    return this.render(opt)
  }

  setActiveNav (nav) {
    this.__template.querySelectorAll('.sidebar-menu > li').forEach((el, index) => {
      if (el.classList.contains(nav)) {
        el.classList.add('active')
      } else {
        el.classList.remove('active')
      }
    })
  }
  __bindListeners () {
    PubSub.unsubscribe('MAIN_NAV')
    PubSub.subscribe('MAIN_NAV', (msg, data) => {
      this.setActiveNav(data)
    })
  }

  async render () {
    this.__template = document.createElement('aside')
    this.__template.classList.add('main-sidebar')
    this.__template.innerHTML = `
    <style>${style.toString()}</style>
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar Menu -->
      <ul class="sidebar-menu" data-widget="tree" style="margin-top: 10px;">
        <li class="home"><a href="#"><i class="fa fa-home"></i> <span>Home</span></a></li>
        <li class="header">PERSONAL</li>
        <li class="treeview menu-open contacts">
          <a href="#/contacts"><i class="fa fa-users"></i> <span>Contacts</span></a>
        </li>
      </ul>


      <ul class="sidebar-menu" data-widget="tree" style="margin-top: 50px;">
        <li><a href="#/signout" id="signout" style="background: #334852;"><i class="fa fa-long-arrow-left"></i> <span>Sign-out</span></a></li>
      </ul>

      <!-- /.sidebar-menu -->
    </section>`
    this.__bindListeners()
    return this.__template
  }
}
