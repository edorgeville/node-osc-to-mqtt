
const { Server } = require('node-osc')
const { connect } = require('mqtt')
const { oscInPort, mqttServer, mqttOutTopic } = require('./config.json')

const client = connect(mqttServer)

var oscServer = new Server(oscInPort, '0.0.0.0', () => {
  console.log('OSC Server is listening on port', oscInPort)
})

oscServer.on('message', (msg) => {
  console.log(`Message: ${msg}`)
  client.publish(mqttOutTopic, msg)
})
