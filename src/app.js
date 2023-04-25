const registerProductListenEvents = require('./products/products.events');
const app = require('./app/config/application.config');

const onDisconnect = async (socket) => {
    socket.broadcast.emit('socket-disconnect', `The socketid: ${socket.id} is gone`);
}

const onConnection = async (socket) => {
    socket.on('disconnect', () => {
        onDisconnect(socket)
    })
    socket.emit('hello', `Hello id: ${socket.id}`)
    socket.broadcast.emit('new-socket-connected', `The socketid: ${socket.id} is connected`);

    registerProductListenEvents(app.io, socket);
}


app.io.on("connection", onConnection);


const PORT = 8080;
app.listen(PORT)
