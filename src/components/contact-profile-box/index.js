/* eslint-disable new-cap */

export default class {
  constructor (opt = {}) {
    this.__opt = opt
    return this.render(opt)
  }

  __bindForm () {
    // Binding form
    /* const form = import('../contact-communication-form/actions/create')
    form.then(res => {
      return new res.default({
        root: this.__template,
        target: '.contact-commu-list-add-btn',
        id: this.__opt.contact_id
      })
    }) */
  }

  __bindListeners () {
    this.__bindForm()
  }

  async render () {
    this.__template = document.createElement('div')
    this.__template.classList.add('col-md-3', 'user-profile-section')
    this.__template.innerHTML = `
          <!-- Profile Image -->
          <div class="box box-primary">
            <div class="box-body box-profile"></div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->`
    this.__bindListeners()
    return this.__template
  }
}
