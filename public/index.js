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
  reader.onload = (function (aImg) {
    return function (e) {
      aImg.src = e.target.result
    }
  })(imageElement)
  reader.readAsDataURL(file)
}

Array.from(pageLinks).forEach(link => link.addEventListener('click', async e => {
  e.preventDefault()
  const link = e.target.href
  const response = await fetch(link)
  const data = await response.json()

  const products = data.payload
  const nextLink = data.nextLink
  const prevLink = data.prevLink
  if (prevLink) {
    prevLinkE.parentElement.classList.remove('disabled')
    prevLinkE.setAttribute('href', prevLink)
  } else {
    prevLinkE.parentElement.classList.add('disabled')
  }
  if (nextLink) {
    nextLinkE.parentElement.classList.remove('disabled')
    nextLinkE.setAttribute('href', nextLink)
  } else {
    nextLinkE.parentElement.classList.add('disabled')
  }

  productListContainer.innerHTML = ''
  products.forEach(product => addProductToHtml(product))
}))

// Evento de cambio de input de imágenes
thumbnailsInput.addEventListener('change', function (e) {
  const selectedFiles = e.target.files

  if (selectedFiles.length > maxFiles) {
    thumbnailsInput.value = ''
    // Eliminar las imágenes de la vista previa
    imageContainer.innerHTML = ''
    return alert(`Solo se permiten subir un máximo de ${maxFiles} imágenes.`)
  }

  for (let i = 0; i < selectedFiles.length; i++) {
    const file = selectedFiles[i]
    const fileExtension = file.name.split('.').pop().toLowerCase()

    if (file.size > maxFileSize) {
      thumbnailsInput.value = ''
      // Eliminar las imágenes de la vista previa
      imageContainer.innerHTML = ''
      return alert('El tamaño de los archivos no puede ser mayor a 5MB.')
    }

    if (!allowedExtensions.includes(fileExtension)) {
      thumbnailsInput.value = ''
      // Eliminar las imágenes de la vista previa
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

  // Eliminar las imágenes de la vista previa
  imageContainer.innerHTML = ''

  files.forEach(function (file) {
    addImageToPreview(file)
  })
})

// Reiniciar el formulario cuando se cierre el modal
addProductModal.addEventListener('hidden.bs.modal', function () {
  addProductForm.reset()
  addProductForm.classList.remove('was-validated')
  thumbnailsInput.value = ''
  imageContainer.innerHTML = ''
})

// Reiniciar el formulario cuando se haga clic en el botón de cierre del modal
closeButton.addEventListener('click', function () {
  addProductForm.reset()
  addProductForm.classList.remove('was-validated')
  thumbnailsInput.value = ''
  imageContainer.innerHTML = ''
})

// Reiniciar el formulario cuando se haga clic fuera del modal
window.addEventListener('click', function (event) {
  if (event.target === addProductModal) {
    addProductForm.reset()
    addProductForm.classList.remove('was-validated')
    thumbnailsInput.value = ''
    imageContainer.innerHTML = ''
  }
})

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

// Agregar un producto al DOM
function addProductToHtml (product) {
  const template = Handlebars.templates['card-product']
  const li = template(product)
  productListContainer.insertAdjacentHTML('beforeend', li)
}

// Escuchar eventos del formulario y realizar petición de creación del producto
try {
  addProductForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    e.stopPropagation()

    const formData = new FormData(addProductForm)
    // const newProduct = Object.fromEntries(formData.entries())

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
    addProductForm.reset()
    addProductForm.classList.remove('was-validated')
    thumbnailsInput.value = ''
    imageContainer.innerHTML = ''
  })
} catch (error) {
}

// Escuchar eventos de creación y eliminación de productos (solo si existe el objeto socket)
try {
  socket.on('product:created', product => {
    console.log('Producto creado')
    addProductToHtml(product)
  })

  socket.on('product:deleted', (id) => {
    console.log('Producto eliminado')
    const li = document.getElementById(id)
    li.remove()
  })
} catch (error) {}
