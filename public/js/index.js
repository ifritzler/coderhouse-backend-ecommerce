var socket = io();

socket.on('hello', payload => {
    console.log(payload)
})

socket.on('new-socket-connected', payload => {
    console.log(payload)
})

socket.on('socket-disconnect', payload => {
    console.log(payload)
})