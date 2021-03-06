var util = require('util')
var Readable = require('stream').Readable
var Card = require('./card')

function ProxIdStream(opts) {
    if (!(this instanceof ProxIdStream)) {
        return new ProxIdStream(opts)
    }

    Readable.call(this, {
        objectMode: true
    })

    if (opts.source instanceof Object) {
        this.source = opts.source
    } else {
       try {
           var sourceClass = require('./' + opts.source)
           this.source = new sourceClass(opts)
       } catch (e) {
           console.log(e)
           return
       }
    }

    var ctx = this

    this.source.init(function() {
        ctx.source.on('data', function(data) {
            var card = Card(data)
            ctx.emit('card-present', card)
            ctx.push(card)
        })
    })

}

util.inherits(ProxIdStream, Readable)

ProxIdStream.prototype._read = function() {
    // We do nothing in the read since pushing is all handled from callbacks from serial
}

module.exports = ProxIdStream
