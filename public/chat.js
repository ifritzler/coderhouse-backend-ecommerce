/* eslint-disable no-undef */
let user = null
const socketMessagesFlag = false
const chatBubble = document.getElementById('chat-bubble')
const chatCloseBtn = document.getElementById('close-chat-btn')
const chat = document.getElementById('chat')
const chatMessageForm = document.getElementById('chat-message-form')
const chatMessageList = document.getElementById('message-list')

function chatScrollToBottom () {
  const xH = chatMessageList.scrollHeight
  chatMessageList.scrollTo(0, xH)
}

function printNewMessage (message) {
  const li = document.createElement('li')
  li.classList.add('message', `${user === message.user ? 'from-me' : 'from-outside'}`)
  li.innerHTML = `<p class="message-user">${message.user}</p>
  <p>${message.message}</p>`
  chatMessageList.appendChild(li)
  chatScrollToBottom()
}

chatBubble.addEventListener('click', (e) => {
  e.preventDefault()
  e.stopPropagation()

  if (!user) {
    user = prompt('Ingrese su email: ')
    const emailRegex = /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/gm
    if (!user || !emailRegex.test(user)) {
      alert('Error al ingresar el email. Por favor intente de nuevo')
      user = null
      return
    }
  }

  try {
    if (!socketMessagesFlag) {
      socket.on('new_message', (message) => {
        console.log(' se escuchó nuevo mensajes')
        printNewMessage(message)
        // TODO: Pintar mensajes no leidos si el bubble esta a la vista y el chat escondido
      })
    }
    chat.style.animation = 'aparecer-chat 1s forwards'
    chatBubble.style.animation = 'desaparecer-bubble 1s forwards'
  } catch {}
})

chatCloseBtn.addEventListener('click', (e) => {
  e.preventDefault()
  e.stopPropagation()

  chat.style.animation = 'desaparecer-chat 1s forwards'
  chatBubble.style.animation = 'aparecer-bubble 1s forwards'
})

chatMessageForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  e.stopPropagation()

  const message = { ...Object.fromEntries(new FormData(chatMessageForm).entries()), user }
  try {
    socket.emit('message:create', message)
  } catch {}
  printNewMessage(message)
  chatMessageForm.reset()
})

chatScrollToBottom()
