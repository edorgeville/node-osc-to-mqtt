const { Client } = require('node-osc')

const resX = 8000
const resY = 5000
const fps = 60

const client = new Client('127.0.0.1', 3333);
setInterval(() => {
  client.send('/oscAddress', positions(), () => {
    // client.close();
  });
}, 1000 / fps)

const positions = () => {
  const IDCount = 120
  let positions = ''
  for (let i = 0; i < IDCount; i++) {
    positions += `#{${i},${Math.random() * resX},${Math.random() * resY}}`
  }
  // 'IDCount#{IDNumber,POSX,POSY}#{IDNumber,POSX,POSY}#'
  return `${IDCount}${positions}`
}