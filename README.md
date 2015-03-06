# Node-ProxId

A stream-based proximity card reader interface.

It is a translation layer between existing rfid/proximity card libraries, and a
common stream interface.

It also provides an interface to the sparkfun USB RFID reader which is a
line-oriented card reader.

## Example

```javascript
var ProxIdStream = require('./lib/proxid')

var p = new ProxIdStream({
    port: '/dev/tty.usbserial-A5026PIE',
    baudrate: 9600,
    source: 'sparkfun'
})

p.pipe(process.stdout)
```
