let socket
try {
  socket = io({})

  socket.on('connect', () => {
    console.log('Coneccion establecida con el servidor.')
  })

  socket.on('new:product', product => {
    console.log('se creo un nuevo producto!')
    const template = Handlebars.compile(productTemplate)
    const productHtml = template({ product })
    const productStoreList = document.querySelector('.product-store-list')
    productStoreList.insertAdjacentHTML('beforeend', productHtml)
  })
} catch (error) { }
