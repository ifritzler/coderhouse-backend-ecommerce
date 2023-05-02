const { httpServer: app, socketServer } = require('./app/config/application.config')
const eventBus = require('./app/EventBus')

const onConnection = async (socket) => {
  console.log('New Connection')
  eventBus.on('new:product', newProduct => {
    console.log('A new product was created with title: ' + newProduct.title)
    socketServer.emit('new:product', newProduct)
  })
}

socketServer.on('connection', onConnection)

const PORT = 8083
app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`)
})
