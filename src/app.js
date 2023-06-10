import { PORT, MONGO_URI } from './config/environ.js'
import { createServer } from 'http'
import express from 'express'
import { engine } from 'express-handlebars'
import productsRouter from './routes/productsRouter.js'
import cartsRouter from './routes/cartsRouter.js'
import viewsRouter from './routes/viewsRouter.js'
import messageRouter from './routes/messageRouter.js'
import initSockets from './socket.js'
import socketMiddleware from './middlewares/socketMiddleware.js'
import multerInterceptor from './middlewares/errors/multerInterceptor.js'
import mongoose from 'mongoose'
import options from './config/mongo.js'
import errorHandler from './middlewares/ErrorHandler.js'

const app = express()
const httpServer = createServer(app)
const ioServer = initSockets(httpServer)

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(socketMiddleware(ioServer))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/messages', messageRouter)
app.use('/', viewsRouter)

app.use(multerInterceptor)
app.use(errorHandler)

httpServer.listen(PORT, async () => {
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
