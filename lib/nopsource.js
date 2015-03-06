var util = require('util')
var EventEmitter = require('events').EventEmitter

function NopSource(opts) {

    if (!(this instanceof NopSource)) {
        return new NopSource(opts)
    }

    this.options = opts || {}

    EventEmitter.call(this)
}

util.inherits(NopSource, EventEmitter)

NopSource.prototype.init = function (cb) {
    cb()
}

module.exports = NopSource
