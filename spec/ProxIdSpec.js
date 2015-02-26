var ProxIdStream = require('../lib/proxid')
var FakeSource = require('./helpers/fake-source')
var NopSource = require('../lib/nopsource')

describe('A ProxIdStream constructor', function() {
    xit('takes options hash', function() {
    })

    it('takes "source" to specify what type of proximity card is use',
        function() {
        var out = new ProxIdStream({
            source: 'nopsource'
        })
        expect(out.source).toEqual(jasmine.any(NopSource))
    })

    xit('passes options through to the card-specific implementation',
        function() {
    })
})

describe('A ProxIdStream', function() {
    it('is a readable stream', function() {
        expect(ProxIdStream.prototype._read).toBeDefined()
    })

    it('takes a source object whose init is called on construction', function() {
        var fakeSource = new FakeSource()

        spyOn(fakeSource, 'init').and.callThrough()

        new ProxIdStream({
            source: fakeSource
        })
        expect(fakeSource.init.calls.count()).toEqual(1)
    })

    it('connects to the on-data event handler of the source', function() {
        var fakeSource = new FakeSource()
        expect(fakeSource.listeners('data').length).toEqual(0)

        new ProxIdStream({
            source: fakeSource
        })
        expect(fakeSource.listeners('data').length).toEqual(1)
    })

    xit('sends an object when it receives a data packet', function() {
    })

    xit('sends a card presented event when it receives a data packet',
       function() {
    })

    xit('sends an error event when it cannot parse the data packet',
      function() {
    })
})
