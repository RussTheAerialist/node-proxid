var ProxIdStream = require('./lib/proxid')

var p = new ProxIdStream({
    port: '/dev/tty.usbserial-A5026PIE',
    baudrate: 9600,
    source: 'sparkfun'
})

p.pipe(process.stdout)
