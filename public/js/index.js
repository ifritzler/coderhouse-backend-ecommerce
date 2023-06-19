/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// Obtener elementos del DOM
const addProductModal = document.getElementById('addProductModal')
const thumbnailsInput = document.getElementById('thumbnails')
const customFileInput = document.querySelector('.custom-file-input')
const closeButton = addProductModal.querySelector('.close')
const imageContainer = document.getElementById('image-container')
const addProductForm = document.getElementById('product-form')
const productListContainer = document.getElementById('product_list')
const pageLinks = document.getElementsByClassName('page-link')
const prevLinkE = document.getElementById('prevLink')
const nextLinkE = document.getElementById('nextLink')
const cartButton = document.getElementById('cartButton')

// Constantes y validaciones de imágenes
const maxFiles = 3
const maxFileSize = 5 * 1024 * 1024 // 5MB en bytes
const allowedExtensions = ['png', 'jpg', 'jpeg', 'webp']

// Función para agregar una imagen a la vista previa
function addImageToPreview (file) {
  const imageWrapper = document.createElement('div')
  imageWrapper.classList.add('image-wrapper')

  const imageElement = document.createElement('img')
  imageElement.classList.add('img-thumbnail', 'square-image')
  imageElement.file = file

  const closeButton = document.createElement('button')
  closeButton.classList.add('btn', 'btn-danger', 'close-button')
  closeButton.innerHTML = 'X'
  imageWrapper.appendChild(imageElement)
  imageWrapper.appendChild(closeButton)

  imageContainer.appendChild(imageWrapper)

  closeButton.addEventListener('click', function () {
    imageWrapper.remove()

    const fileInput = document.querySelector('.custom-file-input')
    fileInput.value = null
  })

  const reader = new FileReader()
  reader.onload = function (e) {
    imageElement.src = e.target.result
  }
  reader.readAsDataURL(file)
}

Array.from(pageLinks).forEach((link) => {
  link.addEventListener('click', async (e) => {
    e.preventDefault()
    const link = e.target.href
    const response = await fetch(link)
    const data = await response.json()

    const products = data.payload
    const nextLink = data.nextLink
    const prevLink = data.prevLink

    prevLinkE.parentElement.classList.toggle('disabled', !prevLink)
    prevLinkE.setAttribute('href', prevLink || '#')
    nextLinkE.parentElement.classList.toggle('disabled', !nextLink)
    nextLinkE.setAttribute('href', nextLink || '#')

    productListContainer.innerHTML = ''
    products.forEach((product) => addProductToHtml(product))
  })
})

// Evento de cambio de input de imágenes
thumbnailsInput.addEventListener('change', function (e) {
  const selectedFiles = e.target.files

  if (selectedFiles.length > maxFiles) {
    thumbnailsInput.value = ''
    imageContainer.innerHTML = ''
    return alert(`Solo se permiten subir un máximo de ${maxFiles} imágenes.`)
  }

  for (let i = 0; i < selectedFiles.length; i++) {
    const file = selectedFiles[i]
    const fileExtension = file.name.split('.').pop().toLowerCase()

    if (file.size > maxFileSize) {
      thumbnailsInput.value = ''
      imageContainer.innerHTML = ''
      return alert('El tamaño de los archivos no puede ser mayor a 5MB.')
    }

    if (!allowedExtensions.includes(fileExtension)) {
      thumbnailsInput.value = ''
      imageContainer.innerHTML = ''
      return alert('Solo se permiten subir archivos PNG, JPG, JPEG y WEBP.')
    }

    addImageToPreview(file)
  }
})

// Evento de cambio del input de archivos
customFileInput.addEventListener('change', function (e) {
  const fileName = thumbnailsInput.files[0].name
  const nextSibling = e.target.nextElementSibling
  nextSibling.innerText = fileName

  const files = Array.from(e.target.files)

  imageContainer.innerHTML = ''

  files.forEach(function (file) {
    addImageToPreview(file)
  })
})

// Reiniciar el formulario cuando se cierre el modal
function resetForm () {
  addProductForm.reset()
  addProductForm.classList.remove('was-validated')
  thumbnailsInput.value = ''
  imageContainer.innerHTML = ''
}

addProductModal.addEventListener('hidden.bs.modal', resetForm)
closeButton.addEventListener('click', resetForm)
window.addEventListener('click', function (event) {
  if (event.target === addProductModal) {
    resetForm()
  }
})

async function createNewCart () {
  const response = await fetch('/api/carts', {
    method: 'post'
  })
  const body = await response.json()
  return body.payload
}

// Agreagar un producto por su ID al carrito
async function addToCart (pid) {
  let cartId = localStorage.getItem('cartId')
  if (!cartId) {
    cartId = await createNewCart()
    localStorage.setItem('cartId', cartId)
  }
  const response = await fetch(`/api/carts/${cartId}/product/${pid}`, {
    method: 'post'
  })

  if (!response.ok) {
    cartId = await createNewCart()
    localStorage.setItem('cartId', cartId)
    await fetch(`/api/carts/${cartId}/product/${pid}`, {
      method: 'post'
    })
  }
  alert('Producto agregado al carrito')
  cartButton.href = `/cart/${localStorage.getItem('cartId')}`
}

// Eliminar un producto por su ID
async function deleteProduct (id) {
  const response = await fetch(`/api/products/${id}`, {
    method: 'delete',
    headers: {
      'x-socket-id': socket?.id || null
    }
  })

  if (response.ok) {
    const li = document.getElementById(id)
    li.remove()
  } else {
    alert((await response.json()).error)
  }
}

async function setFilter (e) {
  const url = new URLSearchParams(window.location.search)
  url.set('limit', e.innerText)
  window.history.pushState({}, '', `?${url.toString()}`)
  window.location.reload()
  return false
}

// Agregar un producto al DOM
function addProductToHtml (product) {
  const template = Handlebars.templates['card-product']
  const li = template(product)
  productListContainer.insertAdjacentHTML('beforeend', li)
}

// Logout User
async function logout () {
  const response = await fetch('/api/session/logout', {
    method: 'delete'
  })
  if (response.redirected) {
    window.location.href = response.url
  }
}

// Escuchar eventos del formulario y realizar petición de creación del producto
addProductForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  e.stopPropagation()

  const formData = new FormData(addProductForm)

  const response = await fetch('/api/products', {
    method: 'post',
    body: formData,
    headers: {
      'x-socket-id': socket?.id || null
    }
  })

  const bodyResponse = await response.json()

  if (response.ok) {
    const product = bodyResponse.payload
    addProductToHtml(product)
  } else {
    const error = bodyResponse.error
    alert(error)
  }

  resetForm()
})

// Escuchar eventos de creación y eliminación de productos (solo si existe el objeto socket)
if (socket) {
  socket.on('product:created', (product) => {
    console.log('Producto creado')
    addProductToHtml(product)
  })

  socket.on('product:deleted', (id) => {
    console.log('Producto eliminado')
    const li = document.getElementById(id)
    li.remove()
  })
}

(async function () {
  if (localStorage.getItem('cartId')) {
    const cartId = localStorage.getItem('cartId')
    // get items in cart and print quantity in cart button

    const response = await fetch(`/api/carts/${cartId}`)
    const body = await response.json()
    const products = body.payload

    if (products.length > 0) {
      // each product has a quantity value, sum all quantity
      const quantity = products.reduce((acc, curr) => acc + curr.quantity, 0)
      cartButton.innerText = `Cart (${quantity})`
    }
    cartButton.href = `/cart/${cartId}`
  }
})()
