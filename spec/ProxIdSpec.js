var ProxIdStream = require('../lib/proxid')
var FakeSource = require('./helpers/fake-source')
var NopSource = require('../lib/nopsource')

describe('A ProxIdStream constructor', function() {
    it('takes options hash', function() {
        var out = new ProxIdStream({
            source: 'nopsource'
        })
        expect(out).toEqual(jasmine.any(ProxIdStream))
    })

    it('takes "source" to specify what type of proximity card is use',
        function() {
            var out = new ProxIdStream({
                source: 'nopsource'
            })
        expect(out.source).toEqual(jasmine.any(NopSource))
    })

    it('passes options through to the card-specific implementation',
        function() {
            var out = new ProxIdStream({
                source: 'nopsource',
                test: 'foo'
            })

            expect(out.source.options.test).toEqual('foo')
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

    it('sends an object when it receives a data packet', function() {
        var fakeSource = new FakeSource()
        var out = new ProxIdStream({
            source: fakeSource
        })

        fakeSource.emit('data', '1234')
        var actual = out.read()
        expect(actual.data).toEqual('1234')
    })

    it('sends a card presented event when it receives a data packet',
       function(done) {
        var fakeSource = new FakeSource()
        var out = new ProxIdStream({
            source: fakeSource
        })

        out.on('card-present', function(data) {
            expect(data.data).toEqual('1234')
            done()
        })

        fakeSource.emit('data', '1234')
    })
})
