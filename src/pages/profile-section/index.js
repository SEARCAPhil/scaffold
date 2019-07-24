/* eslint-disable new-cap */
import style from './index.styl'
const tabs = import('../../utils/tabs')

export default class {
  constructor (opt = {}) {
    this.__opt = opt
    this.__info = {}

    return this.render(opt)
  }

  __assignContactId () {
    this.__template.querySelector('.contact_id_section').innerHTML = this.__info.contact_id
  }
  __bindListeners () {
    this.getProfileBoxComponent()
    this.enableTabs()
    this.loadPopup()
    // this.__bindRemoveAccount()
  }

  createEmptyMessage (icon, message, target) {
    let html = document.createElement('center')
    html.classList.add('text-muted')
    html.innerHTML = `<i class="fa ${icon}" style="font-size:24px;"></i> <br/>${message}`
    target.append(html)
  }
  getProfileBoxComponent () {
    const contact = import('../../components/contact-profile-box')
    return contact.then(res => {
      return new res.default(this.__info).then(html => {
        document.querySelector('.user-profile-section').replaceWith(html)
      })
    })
  }

  enableTabs () {
    tabs.then(res => {
      return new res.default({ root: this.__template }).tab({
        onactive: (handle, target, instane) => {
          // remove active state on all active <li>
          handle.parentNode.parentNode.querySelectorAll('li').forEach((el, index) => {
            el.classList.remove('active')
          })
          // add active status to the parent of current handle
          handle.parentNode.classList.add('active')
        }
      })
    })
  }

  loadPopup () {
    const popupes = import('../../components/popup-es')
    const popupesStyle = import('../../components/popup-es/index.styl')

    // enable popup
    popupesStyle.then(css => {
      const style = document.createElement('style')
      style.id = 'popup-es-style'
      style.innerHTML = css.default.toString()
      if (!document.querySelector('#popup-es-style')) document.head.append(style)
    })

    popupes.then(loader => new loader.default())
  }

  __bindRemoveAccount () {
    import('./actions/remove').then(loader => {
      return new loader.default({
        root: this.__template,
        selector: '.remove-account-btn-modal',
        id: this.__info.contact_id
      })
    })
  }

  async render () {
    const __payload = {
      id: this.__opt.id
    }
    this.__info = await this.getInfo(__payload)

    this.__template = document.createElement('section')
    this.__template.classList.add('profile-section')
    this.__template.innerHTML = `
    <div style="min-height: 1170px;">
    <!-- Content Header (Page header) -->
    <style>${style.toString()}</style>
    <section class="content-header">
      <h4 class="text-muted" style="opacity: 0.3;">
        contact# <span class="contact_id_section"></span>
      </h4>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="#">Contacts</a></li>
        <li class="active">User profile</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <main class="row">
        <div class="user-profile-section row"></div>
      

        <!-- /.col -->
        <div class="col-md-9 col-lg-6">
          <div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
              <li class="active"><a href="#info" data-toggle="tab" aria-expanded="true" class="tabs" data-target="#tab-info" data-group="profile-tab-panes">Info</a></li>
              <li class=""><a href="#fellowship" id="fellowship" data-toggle="tab" aria-expanded="false" class="tabs" data-target="#tab-fellowship" data-group="profile-tab-panes">Fellowships</a></li>
              <li class=""><a href="#engagement" id="engagement" data-toggle="tab" aria-expanded="false" class="tabs" data-target="#tab-engagement" data-group="profile-tab-panes">Engagement</a></li>
              <li class=""><a href="#settings" data-toggle="tab" aria-expanded="false" class="tabs" data-target="#tab-settings" data-group="profile-tab-panes">Settings</a></li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane active" id="tab-info" style="height: auto;overflow:auto;" data-group="profile-tab-panes">
                <section>
                  <h4 class="info-title">&emsp;Employment
                    <span class="pull-right contact-employment-list-add-btn" data-target="#general-modal" data-popup-toggle="open">
                      <i class="fa fa-plus-circle" style="margin-right: 20px;"></i>
                    </span>
                  </h4>
                  <small class="text-muted">&emsp;&nbsp; Recent and current work experience</small>
                  <hr/>
                  <div class="contact-employment-list-section"></div>
                </section>


                <section>
                  <h4 class="info-title">&emsp;Education
                    <span class="pull-right contact-educ-list-add-btn" data-target="#general-modal" data-popup-toggle="open">
                      <i class="fa fa-plus-circle" style="margin-right: 20px;"></i>
                    </span>
                  </h4>
                  <small class="text-muted">&emsp;&nbsp; Educational attainment (Bachelor, Masteral, PhD, etc...)</small>
                  <hr/>
                  <div class="contact-educ-list-section"></div>
                </section>

                <section>
                  <h4 class="info-title">&emsp;Research / Scholarships
                    <span class="pull-right contact-research-list-add-btn" data-target="#general-modal" data-popup-toggle="open">
                      <i class="fa fa-plus-circle" style="margin-right: 20px;"></i>
                    </span>
                  </h4>
                  <small class="text-muted">&emsp;&nbsp; Papers and research created or conducted / Graduate studies(e.g., Seed Fund for Research and Training, Travel Grants, and Professional Chairs) </small>
                  <hr/>
                  <div class="contact-research-list-section"></div>
                </section>


                <section>
                  <h4 class="info-title">&emsp;Conference
                    <span class="pull-right contact-conf-list-add-btn" data-target="#general-modal" data-popup-toggle="open">
                      <i class="fa fa-plus-circle" style="margin-right: 20px;"></i>
                    </span>
                  </h4>
                  <small class="text-muted">&emsp;&nbsp; Talk and lectures attended</small>
                  <hr/>
                  <div class="contact-conference-list-section"></div>
                </section>


               

                <section>
                  <h4 class="info-title">&emsp;Trainings
                    <span class="pull-right contact-training-list-add-btn" data-target="#general-modal" data-popup-toggle="open">
                      <i class="fa fa-plus-circle" style="margin-right: 20px;"></i>
                    </span>
                  </h4>
                  <small class="text-muted">&emsp;&nbsp; Trainings or short courses taken</small>
                  <hr/>
                  <div class="contact-training-list-section"></div>
                </section>
              </div>

              <div class="tab-pane" id="tab-settings"  data-group="profile-tab-panes">
                <div class="alert alert-danger">
                  <h4><i class="icon fa fa-ban"></i> Warning</h4>
                    Plese review this account before doing any further actions. If you continue, you will not be able
                    to view his/her profile and any files associated on this account. Please proceed cautiously.
                </div>
                <br/>
                <span class="text-muted">Do you still want to proceed ?</span> <br/>
                <button class="btn btn-danger remove-account-btn-modal" data-target="#general-modal" data-popup-toggle="open">REMOVE</button>
              </div>

              <div class="tab-pane" id="tab-fellowship"  data-group="profile-tab-panes" style="height: auto;overflow:auto;"></div>
              <div class="tab-pane" id="tab-engagement"  data-group="profile-tab-panes" style="height: auto;overflow:auto;"></div>


    
            </div>
            <!-- /.tab-content -->
          </div>
          <!-- /.nav-tabs-custom -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    <div>
    
    </section>
    <!-- /.content -->
    </main>
  </div>`
    this.__bindListeners()
    return this.__template
  }
}
