var dgram = require('dgram')
var dgrams = require('./')

// setup two (duplex) streams. use type or socket.
var one = dgrams('udp4')
var two = dgrams(dgram.createSocket('udp4'))

// bind to ports. both ways work the same.
one.sock.bind(1234)
two.bind(1235)

// now for something cooler...
var through2 = require('through2')

lines2pkts = through2.obj(function(data, enc, next) {
  this.push({ to: { port: 1235 }, payload: data })
  next()
})

pkts2lines = through2.obj(function(data, enc, next) {
  this.push(data.from.port + ' sent: ' + data.payload)
  next()
})

process.stdin.pipe(lines2pkts).pipe(one)
two.pipe(pkts2lines).pipe(process.stdout)

console.log('ok, try entering some lines:')
