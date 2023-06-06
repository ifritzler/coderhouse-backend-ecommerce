const { PORT, MONGO_URI } = require('./config/environ')
const http = require('http')
const express = require('express')
const { engine } = require('express-handlebars')
const productsRouter = require('./routes/productsRouter.js')
const cartsRouter = require('./routes/cartsRouter.js')
const viewsRouter = require('./routes/viewsRouter')
const messageRouter = require('./routes/messageRouter')
const initSockets = require('./socket.js')
const socketMiddleware = require('./middlewares/socketMiddleware.js')
const errorHandler = require('./middlewares/errorHandler.js')
const multerInterceptor = require('./middlewares/errors/multerInterceptor.js')
const mongoose = require('mongoose')
const options = require('./config/mongo')

const app = express()
const httpServer = http.createServer(app)
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

module.exports = app
