import style from './index.styl'

export default class {
  constructor (opt = {}) {
    this.__opt = opt
    return this.render(opt)
  }

  __bindListeners () {
    let btn = this.__template.querySelector('.main-menu-btn')
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      document.body.classList.toggle('sidebar-open')
    })
  }

  async render () {
    this.__template = document.createElement('header')
    this.__template.classList.add('main-header')
    this.__template.innerHTML = `
        <style>${style.toString()}</style>
        <!-- Header Navbar -->
        <a href="#" class="logo hidden-xs" style="background-color: #353738;">
          <!-- mini logo for sidebar mini 50x50 pixels -->
          <span class="logo-mini"><b>A</b>LT</span>
          <!-- logo for regular state and mobile devices -->
          <span class="logo-lg">
            <center>
              <img src="assets/img/logo.png" width="150px" style="margin-top: 10px;" async="true"/>
            </center>
          </span>
        </a>

        <nav class="navbar navbar-static-top main-navbar" role="navigation">
          <!-- Sidebar toggle button-->
          <a href="#" class="sidebar-toggle main-menu-btn" data-toggle="push-menu" role="button">
            <span class="sr-only">Toggle navigation</span>
          </a>
          <!-- Navbar Right Menu -->
          <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
              <!-- User Account Menu -->
              <li class="dropdown user user-menu">
                <!-- Menu Toggle Button -->
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  <!-- The user image in the navbar-->
                  ${this.__opt.image ? '<img src="' + this.__opt.image + '" class="user-image" alt="User Image"/>' : ''}
                  <!-- hidden-xs hides the username on small devices so only the image appears. -->
                  <span class="hidden-xs">${this.__opt.displayName}</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>`
    this.__bindListeners()
    return this.__template
  }
}
