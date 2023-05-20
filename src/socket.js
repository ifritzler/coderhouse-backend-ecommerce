const { Server } = require('socket.io')

const initSockets = (httpServer) => {
  const socketServer = new Server(httpServer)

  socketServer.on('connection', (socket) => {
    console.log('Usuario conectado con id: ' + socket.id)
  })

  return socketServer
}

module.exports = initSockets
