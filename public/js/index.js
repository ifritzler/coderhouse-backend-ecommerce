var socket = io();
socket.on('new-socket-connected', payload => {
    console.log(payload)
})

socket.on('new:product', payload => {
    console.log('Notification: New product created')
    console.log(payload)
})

console.log('Hola mundo')