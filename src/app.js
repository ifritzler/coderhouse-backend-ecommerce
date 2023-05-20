const express = require('express')
const productsRouter = require('./routes/productsRouter.js')
const { engine } = require('express-handlebars')
const viewsRouter = require('./routes/viewsRouter')
const initSockets = require('./socket.js')
const http = require('http')
const socketMiddleware = require('./middlewares/socketMiddleware.js')
const errorHandler = require('./middlewares/errorHandler.js')
const cartsRouter = require('./routes/cartsRouter.js')
const multerInterceptor = require('./middlewares/errors/multerInterceptor.js')

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
app.use('/', viewsRouter)

app.use(multerInterceptor)
app.use(errorHandler)

httpServer.listen(8080, () => {
  console.log('Server up and running on port 8080')
})

module.exports = app
