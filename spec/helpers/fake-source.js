var util = require('util')
var EventEmitter = require('events').EventEmitter

function FakeSource() {
    EventEmitter.call(this)
}

util.inherits(FakeSource, EventEmitter)

FakeSource.prototype.init = function(cb) {
    cb()
}

module.exports = FakeSource
