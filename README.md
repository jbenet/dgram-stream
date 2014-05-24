# dgram-stream - udp as a duplex stream

> What!? a dgram stream? You're crazy.

Yep, I am.

## Usage

```
npm install dgram-stream
```

Write "packets" like:

```js
{
  "to": {port: 1234}
  "payload": new Buffer("my data"),
}
```

Get "packets" like:

```js
{ from: { address: '127.0.0.1', family: 'IPv4', port: 55230, size: 11 },
  payload: <Buffer 6d 79 20 64 61 74 61> }
```

Example:

```js
var dgram = require('dgram')
var ds = require('./')

// setup the receiver
var listenSocket = dgram.createSocket('udp4')
var listenStream = ds(listenSocket);

listenStream.on('data', function(item) {
  // receive!
  console.log(item)
})

listenSocket.bind(1234)


// setup the sender
var sendSocket = dgram.createSocket('udp4')
var sendStream = ds(sendSocket)

// send!
sendStream.write({
  to: {port:1234},
  payload: 'abcdef'
})
```

More at [example.js](example.js).
