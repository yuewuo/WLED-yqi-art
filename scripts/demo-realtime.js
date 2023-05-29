import dgram from 'node:dgram'

var client = dgram.createSocket('udp4')

// var data = Buffer.from('hello')


const nLED = 9
const data = new Uint8Array(2 + nLED * 3)
data[0] = 2  // RGB format, see https://github.com/Aircoookie/WLED/wiki/UDP-Realtime-Control
data[1] = 1  // wait for 1 seconds before returning to default preset

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

for (let t=0; t<600; ++t) {
    await sleep(33)

    for (let i=0; i<nLED; ++i) {
        const bias = 2 + 3 * i
        // order: R G B
        data[bias + 0] = 0
        data[bias + 1] = Math.round(255 * i / nLED)
        data[bias + 2] = Math.round(255 * (1 + Math.cos(t / 30 * Math.PI)) / 2)
    }

    client.send(data, 21324, '192.168.31.100', function(error) {
        if (error) {
            console.log('[error] closing client')
            process.exit(1)
        }
    })
}

client.close()
