function socketMiddleware (ioServer) {
  return (req, res, next) => {
    const socketId = req.headers['x-socket-id']
    req.ioServer = ioServer
    req.clientSocket = ioServer.sockets.sockets.get(socketId)
    next()
  }
}

export default socketMiddleware
