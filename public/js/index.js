try {
  const newProductNotification = Toastify({
    text: "Nuevo Producto creado",
    duration: 3000,
    destination: "#",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function(){} // Callback after click
  })

  // eslint-disable-next-line no-undef
  const socket = io()
  socket.on('new-socket-connected', payload => {
    console.log(payload)
  })

  socket.on('new:product', payload => {
    newProductNotification.showToast();
    console.log(payload)
  })

  const onlineWatch = document.getElementById('online-watch')

  socket.on('connect', () => {
    onlineWatch.innerText = 'Online'
    onlineWatch.style.backgroundColor = 'green'
    onlineWatch.style.opacity = 1
  })

  socket.on('disconnect', () => {
    onlineWatch.style.opacity = 0
    onlineWatch.innerText = 'Offline'
    onlineWatch.style.backgroundColor = 'red'
    onlineWatch.style.opacity = 1
  })
  
} catch (error) {}
