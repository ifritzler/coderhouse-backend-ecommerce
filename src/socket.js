const { Server } = require('socket.io')
const messageService = require('./services/messages/MessageService')

const initSockets = (httpServer) => {
  const socketServer = new Server(httpServer)

  socketServer.on('connection', (socket) => {
    console.log('Usuario conectado con id: ' + socket.id)

    socket.on('message:create', async message => {
      const newMessage = await messageService.createMessage(message)
      socket.broadcast.emit('new_message', newMessage)
    })
  })

  return socketServer
}

module.exports = initSockets
