
const { Server } = require('node-osc')
const { connect } = require('mqtt')
const { oscInPort, mqttServer, mqttOutTopic } = require('./config.json')

const client = connect(mqttServer)

var oscServer = new Server(oscInPort, '0.0.0.0', () => {
  console.log('OSC Server is listening on port', oscInPort)
})

oscServer.on('message', (msg) => {
  const [oscTopic, oscPayload] = msg
  console.log(`Received on topic: "${oscTopic}", size: "${oscPayload.length}"`)
  const mqttTopic = oscTopic.substring(1)
  const mqttPayload = oscPayload.toString()
  console.log(`Sending on topic: "${mqttTopic}", size: "${mqttPayload.length}"`)
  client.publish(mqttTopic, mqttPayload)
})
