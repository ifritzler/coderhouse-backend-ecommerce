import expressApp from './express.config.js'
import http from 'http'
import { Server } from 'socket.io'

// Creating a http server. It is used by the Server class of socket.io package
// to create an instance of socket server.
export const httpServer = http.createServer(expressApp)
export const socketServer = new Server(httpServer)

// Make it available to all proyect
export default {
  socketServer,
  httpServer
}
