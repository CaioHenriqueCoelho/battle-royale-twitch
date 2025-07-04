const WebSocket = require('ws');
let wss;

function initBroadcastServer(server) {
  wss = new WebSocket.Server({ server });
  return wss;
}

function broadcast(data) {
  if (!wss) {
    console.warn('WebSocket server não inicializado ainda.');
    return;
  }
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

module.exports = {
  initBroadcastServer,
  broadcast
};
