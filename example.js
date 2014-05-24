
var dgram = require('dgram')
var ds = require('./')

// setup the receiver
var listenSocket = dgram.createSocket('udp4')
var listenStream = ds(listenSocket);

listenStream.on('data', function(item) {
  // receive!
  console.log(item)
})

listenStream.on('end', function(item) {
  console.log('listenStream closed')
})

// bind on the socket or stream works
listenStream.bind(1234)


// setup the sender
var sendSocket = dgram.createSocket('udp4')
var sendStream = ds(sendSocket)

// send!
for (var i = 0; i < 100; i++) {
  sendStream.write({
    to: {port:1234},
    payload: new Buffer('message #' + i),
  })
}
sendStream.write(null);

sendStream.on('end', function(item) {
  console.log('sendStream closed')

  // closing either stream or sock directly works.
  listenStream.close()
})
