import { Server } from 'socket.io'
import messageService from './services/messages/MessageService.js'
import sharedsession from 'express-socket.io-session'
import { mongoSession } from './middlewares/mongo-session.js'
import { Session } from 'express-session'
const initSockets = (httpServer) => {
  const socketServer = new Server(httpServer)

  socketServer.use(sharedsession(mongoSession, {
    autoSave: true
  }))

  // socketServer.use((socket, next) => {
  //   console.log(socket)
  //   if (!socket?.handshake?.session?.user) {
  //     return socket.close()
  //   }
  //   next()
  // })

  socketServer.on('connection', (socket) => {
    if (!socket.handshake.session || !socket.handshake.session.user) {
      console.log('El usuario fue desconectado')
      socket.disconnect()
      return
    }

    console.log('Usuario conectado con id: ' + socket.id)
    socket.on('message:create', async message => {
      if (new Date(socket.handshake.session.cookie._expires) < new Date()) {
        console.log('El usuario fue desconectado')
        socket.disconnect()
      }
      if (!message.message) return
      const newMessage = await messageService.createMessage(message)
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
