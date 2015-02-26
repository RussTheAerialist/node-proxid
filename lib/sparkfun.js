// SparkFun RFID USB Reader
// https://www.sparkfun.com/products/9963
var util = require('util')
var SerialPort = require('serialport').SerialPort
var EventEmitter = require('events').EventEmitter

function Sparkfun(opts) {
    opts = opts || {}

    if (!(this instanceof Sparkfun)) {
        return new Sparkfun(opts)
    }

    EventEmitter.call(this)

    this.buffer = ''
    this.messages = []

    this.serial = new SerialPort(opts.port, opts)
}

util.inherits(Sparkfun, EventEmitter)

Sparkfun.prototype.init = function (cb) {
    var ctx = this

    this.serial.open(function (error) {
        if (error) {
            ctx.emit('error', 'serialport', error)
            cb(error)
            return;
        }

        ctx.serial.on('data', function (data) {
            ctx.append_data(data)
        })
        cb()
    })
}

Sparkfun.prototype.append_data = function (data) {
    this.buffer += data
    var idx = this.buffer.indexOf('\n')
    if (idx < 0) {
        return
    }

    this.emit('data', this.buffer.substr(0, idx - 1))
    this.buffer = this.buffer.substr(idx + 1)
}


module.exports = Sparkfun
