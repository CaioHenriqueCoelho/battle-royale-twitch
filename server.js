require('dotenv').config();
const express = require('express');
const WebSocket = require('ws');
const { setupTwitchClient } = require('./config/twitchClient');
const { authMiddleware } = require('./services/authMiddleware');
const { handleBattleCommand, resetBattle, startBattle, getBattleState } = require('./services/battleService');
const http = require('http');
const app = express();
const PORT = 3000;

// Criar o servidor HTTP explicitamente
const server = http.createServer(app);
const { initBroadcastServer, broadcast } = require('./utils/broadcast');

const wss = initBroadcastServer(server);

// Middleware e static
app.use(authMiddleware);
app.use(express.static('public'));

// Twitch bot setup
const twitchClient = setupTwitchClient();
twitchClient.connect();

twitchClient.on('message', (channel, tags, message, self) => {
  if (self) return;
  const nome = tags['display-name'];
  if (message.toUpperCase().includes('!BATALHA')) {
    handleBattleCommand(nome);
  }
});

// WebSocket connection
wss.on('connection', (ws) => {
  ws.on('message', (msg) => {
    const { comando } = JSON.parse(msg);
    if (comando === 'resetar') resetBattle();
    if (comando === 'iniciar') startBattle();
  });

  // Enviar estado inicial ao conectar
  broadcast(getBattleState());
});

// Finalmente, iniciar o servidor HTTP
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});