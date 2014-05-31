var dgram = require('dgram')
var dgrams = require('./')

// setup two (duplex) streams. use type or socket.
var one = dgrams('udp4')
var two = dgrams(dgram.createSocket('udp4'))

// bind to ports. both ways work the same.
one.sock.bind(1234)
two.bind(1235)

// data handlers
one.on('data', function(item) {
  console.log('one got: ' + item.payload)
})

two.on('data', function(item) {
  console.log('two got: ' + item.payload)
})

// try it out!
one.write({ to: { port:1235 }, payload: 'beep' })
two.write({ to: { port:1234 }, payload: 'boop' })

setTimeout(function() {
  console.log('closing...')
  one.write(null)
  two.end()
}, 1000)
