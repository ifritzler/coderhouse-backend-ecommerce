const { Server } = require('socket.io')
const messageService = require('./services/messages/MessageService')

const initSockets = (httpServer) => {
  const socketServer = new Server(httpServer)

  socketServer.on('connection', (socket) => {
    console.log('Usuario conectado con id: ' + socket.id)

    socket.on('message:create', async message => {
      if (!message.message) return
      const newMessage = await messageService.createMessage(message)
      socket.broadcast.emit('new_message', newMessage)
    })

    socket.on('getLastMessages', async () => {
      const messages = await messageService.getMessages(20)
      socket.emit('lastMessages', messages)
    })
  })

  return socketServer
}

module.exports = initSockets
