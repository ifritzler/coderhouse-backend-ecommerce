import express from 'express'
import { engine } from 'express-handlebars'
import http from 'http'
import { Server } from "socket.io"
import ErrorHandler from './middlewares/ErrorHandler.js'
import apiRouter from './routes/api.router.js'
import clientRouter from './routes/client.router.js'

const app = express()
const server = http.createServer(app);
const io = new Server(server);

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use((req, res, next) => {
  req.io = io;
  next()
})

io.on('connection', (socket) => {
  console.log(`User connected with socket id: ${socket.id}`);
});

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
