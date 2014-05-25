var inherits = require('inherits');
var defaults = require('defaults');
var Duplex = require('stream').Duplex
          || require('readable-stream').Duplex;

module.exports = DgramStream;

function DgramStream(sock, opts) {
  if (!(this instanceof DgramStream))
    return new DgramStream(sock, opts);

  if (!sock)
    throw new Error("dgram-stream requires 'socket' argument.")

  var self = this;

  opts = defaults(opts, {highWaterMark: 16})
  opts.objectMode = true
  Duplex.call(this, opts);

  this.sock = sock;

  this.sock.on('message', function(msg, rinfo) {
    self.emit('data', {
      from: rinfo,
      payload: msg,
    })
  })

  this.sock.on('close', function() {
    self.emit('end')
  })

}

inherits(DgramStream, Duplex);

DgramStream.prototype._write = function (packet, enc, next) {
  if (packet === null)
    return this.end();

  if (!packet.to)
    return this.emit('error',
      new Error('dgram-stream packet must have "to".'))

  if (!packet.payload)
    return this.emit('error',
      new Error('dgram-stream packet must have "payload".'))

  var p = packet.payload
  if (!(p instanceof Buffer))
    p = new Buffer(p)

  var to = packet.to
  var self = this;
  this.sock.send(p, 0, p.length, to.port, to.address, function (err) {
      if (err) self.emit('error', err)
      else next();
  })

};

DgramStream.prototype._read = function () {}

DgramStream.prototype.end = function () {
  this.sock.close();
  Duplex.prototype.end.apply(this, arguments)
}

DgramStream.prototype.address = function() {
  return this.sock.address();
}

DgramStream.prototype.close = function() {
  return this.sock.close();
}

DgramStream.prototype.bind = function() {
  return this.sock.bind.apply(this.sock, arguments);
}

function splitAddr(addr) {
  var i = addr.lastIndexOf(':');
  return {
    addr: addr.substr(0, i),
    port: parseInt(addr.substr(i + 1), 10),
  }
}
