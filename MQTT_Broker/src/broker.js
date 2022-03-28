var date_and_time = require('../component/date_and_time');
var net = require('net')
var mqttCon = require('mqtt-connection');
const { Console } = require('console');
const { hostname } = require('os');
var server = new net.Server()

var port = 1883;
server.on('connection', function (stream) {
  var client = mqttCon(stream)

  // client connected
  client.on('connect', function (packet) {
    // acknowledge the connect packet
    client.connack({ returnCode: 0 });
    console.log("Client on connect");
  })

  // client published
  client.on('publish', function (packet) {
    // send a puback with messageId (for QoS > 0)
    client.puback({ messageId: packet.messageId })
    date_and_time.logTime("Client on publish");
  })

  // client pinged
  client.on('pingreq', function () {
    // send a pingresp
    client.pingresp()
    console.log("Client on pingreq");
  });

  // client subscribed
  client.on('subscribe', function (packet) {
    // send a suback with messageId and granted QoS level
    client.suback({ granted: [packet.qos], messageId: packet.messageId })
    console.log("Client on subscribe");
  })

  // timeout idle streams after 5 minutes
  stream.setTimeout(1000 * 60 * 5)

  // connection error handling
  client.on('close', function () { client.destroy();console.log("Client on close"); })
//   client.on('error', function () { client.destroy();console.log("Client on error"); })
  client.on('error', err => { console.log(err); })
  client.on('disconnect', function () { client.destroy();console.log("Client on disconnect"); })

  // stream timeout
  stream.on('timeout', function () { client.destroy(); })
})

// listen on port 1883
server.listen(port)
console.log("Server listening on port " + port);