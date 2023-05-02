import http from 'http'
import { app } from './express.config.js'
import { Server } from 'socket.io'

// Creating a http server. It is used by the Server class of socket.io package
// to create an instance of socket server.
export const httpServer = http.createServer(app)
export const socketServer = new Server(httpServer)
