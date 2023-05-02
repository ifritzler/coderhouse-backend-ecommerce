const expressApp = require('./express.config')
const httpServer = require('http').createServer(expressApp)
const socketServer = new (require('socket.io').Server)(httpServer)

module.exports = {
  socketServer,
  httpServer
}
