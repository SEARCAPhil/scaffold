/* eslint-disable new-cap */
const URL = import('../../utils/xhr')

export default class {
  constructor (opt = {}) {
    this.__opt = opt
    this.__contactComponent = {}
    this.__listSecTemplate = {}
    this.__timeout = {}
    this.__headers = { 'Authorization': `Bearer ${window.localStorage.getItem('cwp.access_token')}` }
    return this.render(opt)
  }

  async search (opt) {
    this.xhr = new (await URL).default()
    return this.xhr.__getData(`contact/search/${opt.param}?page=${opt.page ? opt.page : 1}`, this.__headers)
  }

  __search (payload) {
    this.search(payload).then(res => { })
  }
  __bindSearch () {
    this.__template.querySelector('.search-bar:not(.event-binded)').addEventListener('keyup', (e) => {
      e.target.classList.add('event-binded')
      const input = e.target
      if (!input.value.length) this.__bindListeners()
      if (input.value.length < 3) return clearTimeout(this.__timeout)

      let payload = {
        param: input.value
      }

      clearTimeout(this.__timeout)
      this.__timeout = setTimeout(() => {
        this.__search(payload)
      }, 1000)
    })
  }

  async __bindListeners (opt = {}) {
    // this.__bindSearch()
  }

  async render () {
    this.__template = document.createElement('section')
    this.__template.classList.add('contacts-section')
    this.__template.innerHTML = `<div " style="min-height: 1170px;">
     <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        <small>Contact List</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">Contact List</li>
      </ol>

      <div class="media">
        <div class="media-left">
          <span>
            <img class="media-object" src="https://banner2.kisspng.com/20180221/bqq/kisspng-smartphone-mobile-phone-cartoon-hand-phone-5a8e02d08fa7e1.2797760215192562725884.jpg" alt="..." width="50px">
          </span>
        </div>
        <div class="media-body">
          <h4 class="media-heading">Phonebook</h4>helps you easily find person on your records</div>
      </div>

      <div class="row col-12">
          <div class="input-group sidebar-form">
            <input type="text"  name="q" class="form-control search-bar" placeholder="Search..." autocomplete="off">
            <span class="input-group-btn">
                  <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                  </button>
                </span>
          </div>
      </div>
      
      <p>Total : <span class="badge"><span class="total-count"></span> out of <span class="total-count-out-of"></span></span></p>

    </section>

    <!-- Main content -->
    <section class="content contact-list-section"></section>
    


    <!-- /.content -->
  </div>`
    this.__bindListeners()
    return this.__template
  }
}
