const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'swa-confirm-btn',
    cancelButton: 'swa-confirm-btn',
    denyButton: 'swa-deny-btn'
  },
  buttonsStyling: false
})

const deleteConfirmationAlert = (cb) => {
  swalWithBootstrapButtons.fire({
    title: 'Do you want to delete that product?',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Confirm',
    denyButtonText: `Cancel`,
    allowOutsideClick: true
  }).then(async (result) => {
    if (result.isConfirmed) {
      const result = cb()
      if (result) {
        Swal.fire('Saved!', '', 'success')
      }
    }
  })
}