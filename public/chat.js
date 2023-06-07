/* eslint-disable no-undef */

// Variables
let user = null // Usuario actual
let socketMessagesFlag = false // Bandera para controlar los mensajes del socket

// Elementos del DOM
const chatBubble = document.getElementById('chat-bubble') // Burbuja del chat
const chatCloseBtn = document.getElementById('close-chat-btn') // Botón para cerrar el chat
const chat = document.getElementById('chat') // Contenedor del chat
const chatMessageForm = document.getElementById('chat-message-form') // Formulario de mensajes
const chatMessageList = document.getElementById('message-list') // Lista de mensajes
const submitButtonBtn = document.getElementById('submit-message-btn') // Botón de envío de mensajes
const inputMessage = document.getElementById('message') // Campo de entrada de mensajes

// Función para hacer scroll hacia abajo en la lista de mensajes
function chatScrollToBottom () {
  const xH = chatMessageList.scrollHeight
  chatMessageList.scrollTo(0, xH)
}

// Función para imprimir un nuevo mensaje en la lista
function printNewMessage (message) {
  const datetime = new Date(message.createdAt).toLocaleTimeString().split(':').slice(0, 2).join(':')
  const li = document.createElement('li')
  li.classList.add('message', `${user === message.user ? 'from-me' : 'from-outside'}`)
  li.innerHTML = `
    <p class="message-user"><span>${message.user}</span> <span>${datetime}</span></p>
    <p>${message.message}</p>`
  chatMessageList.appendChild(li)
  chatScrollToBottom()
}

// Evento click en la burbuja del chat
chatBubble.addEventListener('click', (e) => {
  e.preventDefault()
  e.stopPropagation()

  if (!user) {
    // Solicitar al usuario que ingrese su email
    user = prompt('Ingrese su email: ')
    const emailRegex = /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/gm
    if (!user || !emailRegex.test(user)) {
      alert('Error al ingresar el email. Por favor intente de nuevo')
      user = null
      return
    }
  }

  // Evento input en el campo de entrada de mensajes
  inputMessage.addEventListener('input', (e) => {
    if (e.target.value === '') {
      submitButtonBtn.setAttribute('disabled', true)
    } else {
      submitButtonBtn.removeAttribute('disabled')
    }
  })

  try {
    if (!socketMessagesFlag) {
      // Emitir evento para obtener los últimos mensajes
      socket.emit('getLastMessages')

      // Evento para escuchar nuevos mensajes
      socket.on('new_message', (message) => {
        console.log(' se escuchó nuevo mensajes')
        printNewMessage(message)
        // TODO: Pintar mensajes no leídos si la burbuja está a la vista y el chat está oculto
      })

      // Evento para recibir los últimos mensajes
      socket.on('lastMessages', (messages) => {
        messages.forEach((message) => printNewMessage(message))
      })

      socketMessagesFlag = true
    }

    // Animaciones para mostrar el chat y ocultar la burbuja
    chat.style.animation = 'aparecer-chat 1s forwards'
    chatBubble.style.animation = 'desaparecer-bubble 1s forwards'
  } catch {}
})

// Evento click en el botón para cerrar el chat
chatCloseBtn.addEventListener('click', (e) => {
  e.preventDefault()
  e.stopPropagation()

  // Animaciones para ocultar el chat y mostrar la burbuja
  chat.style.animation = 'desaparecer-chat 1s forwards'
  chatBubble.style.animation = 'aparecer-bubble 1s forwards'
})

// Evento submit en el formulario de mensajes
chatMessageForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  e.stopPropagation()

  // Crear objeto de mensaje a partir de los datos del formulario
  const message = { ...Object.fromEntries(new FormData(chatMessageForm).entries()), user }
  if (!message.message) {
    return
  }
  try {
    // Emitir evento para crear un nuevo mensaje
    socket.emit('message:create', message)
    submitButtonBtn.setAttribute('disabled', true)
  } catch {}
  printNewMessage(message)
  chatMessageForm.reset()
})

// Realizar scroll hacia abajo al cargar la página
chatScrollToBottom()
