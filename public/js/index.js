const addProductForm = document.getElementById('addProductForm')
addProductForm.addEventListener('submit', async (event) => {
  event.preventDefault()
  const formData = new FormData(event.target)

  const response = await fetch('/api/products', {
    method: 'post',
    body: formData
  })

  if (response.ok) {
    alert('Producto agregado exitosamente.')
  } else {
    console.log((await response.json()).error)
  }
  event.target.reset()
})
