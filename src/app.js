import express from 'express'
import { engine } from 'express-handlebars'
import http from 'http'
import ErrorHandler from './middlewares/ErrorHandler.js'
import apiRouter from './routes/api.router.js'
import clientRouter from './routes/client.router.js'
import { initSockets } from './services/sockets/index.js'
import ioMiddleware from './middlewares/ioMiddleware.js'

const app = express()
const server = http.createServer(app)

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

const io = initSockets(server)
app.use(ioMiddleware(io))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', express.static('public'))

app.use(clientRouter)
app.use('/api', apiRouter)

app.use(ErrorHandler.intercept)

const PORT = 8080

server.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT} 🚀`)
})
