import { PORT, MONGO_URI } from './config/environ.js'
import { createServer } from 'http'
import express from 'express'
import sessionRouter from './routes/api/sessionRouter.js'
import productsRouter from './routes/api/productsRouter.js'
import cartsRouter from './routes/api/cartsRouter.js'
import usersRouter from './routes/api/usersRouter.js'
import viewsRouter from './routes/client/viewsRouter.js'
import messageRouter from './routes/api/messageRouter.js'
import initSockets from './socket.js'
import socketMiddleware from './middlewares/socketMiddleware.js'
import multerInterceptor from './middlewares/errors/multerInterceptor.js'
import mongoose from 'mongoose'
import options from './config/mongo.js'
import errorHandler from './middlewares/ErrorHandler.js'
import { mongoSession } from './middlewares/mongo-session.js'
import { initHandleBars } from './config/handlebars.config.js'

const app = express()
const httpServer = createServer(app)
const ioServer = initSockets(httpServer)

app.use(mongoSession)
initHandleBars(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(socketMiddleware(ioServer))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/messages', messageRouter)
app.use('/api/users', usersRouter)
app.use('/api/session', sessionRouter)
app.use('/', viewsRouter)

app.use(multerInterceptor)
app.use(errorHandler)

httpServer.listen(PORT, '0.0.0.0', async () => {
  await mongoose.connect(MONGO_URI, options)
  console.log('Mongo database is initialized! 😁👍')
  console.log('Server up and running on port ' + PORT + ' 🆗🙆')
})

httpServer.on('close', async () => {
  await mongoose.disconnect()
})

httpServer.on('error', async () => {
  await mongoose.disconnect()
})

export default app
