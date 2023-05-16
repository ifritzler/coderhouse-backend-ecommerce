import { Server } from 'socket.io'

export function initSockets (server) {
  const io = new Server(server)

  io.on('connection', (socket) => {
    console.log(`Cliente conectado con socket id: ${socket.id}`)
  })

  return io
}
