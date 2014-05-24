# dgram-stream - udp messages a duplex stream

> What!? a dgram stream? You're crazy.

Yep, I am.

## Usage

```
npm install dgram-stream
```

```js
var dgram = require('dgram')
var ds = require('./')

// setup the receiver
var listenSock = dgram.createSocket('udp4')
var listenStream = ds(listenSock);

listenStream.on('data', function(item) {
  // receive!
  console.log(item)
})

listenSock.bind(1234)


// setup the sender
var sendSock = dgram.createSocket('udp4')
var sendStream = ds(sendSock)

// send!
sendStream.write({
  to: {port:1234},
  payload: 'abcdef'
})
```

See [example.js](example.js).
