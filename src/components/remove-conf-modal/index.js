import style from './style.styl'

const template = `
  <style>${style.toString()}</style>
  <section class="remove-modal-section">
    <center>
      <h3>Remove</h3>
      <p>This will be removed permanently in the system and could not be recovered. Are you sure you want to continue?</p>
    </center>
    <div class="row btn-form">
      <div class="col col-lg-6 col-xs-6 col-md-6 col-sm-6 text-center btn-item" id="modal-dialog-close-button">
        <p>CANCEL</p>
      </div>
      <button class="col col-lg-6 col-xs-6 col-md-6 col-sm-6 text-center btn-item" id="modal-dialog-remove-button">
        <p>PROCEED</p>
      </button>
    </div>
  </section>
`

export { template }
