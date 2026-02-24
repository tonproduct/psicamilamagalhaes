// WebSocket Relay Server — Figma Bridge
// Roda na porta 3055 e gerencia o canal 'figma-bridge'
// Conecta Claude <-> plugin Figma

const { WebSocketServer } = require('ws');

const PORT = 3055;
const wss = new WebSocketServer({ port: PORT });

// Map de canal -> Set de clientes
const channels = new Map();

function getChannel(name) {
  if (!channels.has(name)) channels.set(name, new Set());
  return channels.get(name);
}

wss.on('connection', (ws) => {
  let clientChannel = null;
  let clientId = null;

  ws.on('message', (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }

    if (msg.type === 'join') {
      clientChannel = msg.channel;
      clientId = msg.id || 'unknown';
      getChannel(clientChannel).add(ws);
      ws.send(JSON.stringify({ type: 'system', message: `Joined channel ${clientChannel}` }));
      console.log(`[relay] ${clientId} joined #${clientChannel}`);
      return;
    }

    if (msg.type === 'broadcast' && clientChannel) {
      const peers = getChannel(clientChannel);
      const payload = JSON.stringify({ type: 'broadcast', from: clientId, message: msg.message });
      peers.forEach((peer) => {
        if (peer !== ws && peer.readyState === 1) {
          peer.send(payload);
        }
      });
      console.log(`[relay] broadcast from ${clientId} in #${clientChannel}:`, JSON.stringify(msg.message).slice(0, 120));
      return;
    }
  });

  ws.on('close', () => {
    if (clientChannel) {
      getChannel(clientChannel).delete(ws);
      console.log(`[relay] ${clientId} left #${clientChannel}`);
    }
  });

  ws.on('error', () => {});
});

console.log(`[relay] WebSocket relay running on ws://localhost:${PORT}`);
console.log(`[relay] Waiting for Figma plugin and Claude to connect…`);
