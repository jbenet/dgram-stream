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
var dgrams = require('dgram-stream')

// setup two (duplex) streams. use type or socket.
var one = dgrams('udp4')
var two = dgrams(dgram.createSocket('udp4'))

// bind to ports. both ways work the same.
one.sock.bind(1234)
two.bind(1235)

// data handlers
one.on('data', function(item) {
  console.log('one got: ' + item)
})

two.on('data', function(item) {
  console.log('two got: ' + item)
})

// try it out!
one.write({ to: { port:1235 }, payload: 'beep' })
two.write({ to: { port:1234 }, payload: 'boop' })
```

More at:
- [example1.js](example1.js) - simple example
- [example2.js](example2.js) - `stdin -> udp send -> udp recv -> stdout`
