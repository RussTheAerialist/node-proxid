var util = require('util')
var EventEmitter = require('events').EventEmitter

function FakeSource(opt) {
    EventEmitter.call(this)
    this.options = opt || {}
}

util.inherits(FakeSource, EventEmitter)

FakeSource.prototype.init = function(cb) {
    cb()
}

module.exports = FakeSource
