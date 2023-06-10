import { Server } from 'socket.io'
import messageService from './services/messages/MessageService.js'

const initSockets = (httpServer) => {
  const socketServer = new Server(httpServer)

  socketServer.on('connection', (socket) => {
    console.log('Usuario conectado con id: ' + socket.id)

    socket.on('message:create', async message => {
      if (!message.message) return
      const newMessage = await messageService.createMessage(message)
      console.log(newMessage)
      socketServer.emit('new_message', newMessage)
    })

    socket.on('getLastMessages', async () => {
      const messages = await messageService.getMessages(20)
      socket.emit('lastMessages', messages)
    })
  })

  return socketServer
}

export default initSockets
