const {Server} = require('socket.io')

const expressApp = require('./express.config');
const server = require('http').createServer(expressApp);
const io = new Server(server);

class Application {
    constructor(io, server) {
        this.io = io;
        this.server = server;
    }

    listen(port) {
        this.server.listen(port, () => {
            console.log(`Server up and running on port ${port}`);
        })
    }
}

module.exports = new Application(io, server)
