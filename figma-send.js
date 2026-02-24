// figma-send.js — Envia codigo Figma Plugin API via relay
// Uso: node figma-send.js "<codigo figma api>"
// Ou:  node figma-send.js --file caminho/para/arquivo.js

const { WebSocket } = require('ws');
const fs = require('fs');

const RELAY = 'ws://localhost:3055';
const CHANNEL = 'figma-bridge';

let code = '';

const args = process.argv.slice(2);
if (args[0] === '--file' && args[1]) {
  code = fs.readFileSync(args[1], 'utf8');
} else if (args[0]) {
  code = args[0];
} else {
  console.error('Uso: node figma-send.js "<codigo>" ou node figma-send.js --file arquivo.js');
  process.exit(1);
}

const ws = new WebSocket(RELAY);

ws.on('open', () => {
  ws.send(JSON.stringify({ type: 'join', channel: CHANNEL, id: 'claude-sender' }));
});

ws.on('message', (raw) => {
  let msg;
  try { msg = JSON.parse(raw); } catch { return; }

  if (msg.type === 'system' && msg.message && msg.message.startsWith('Joined')) {
    ws.send(JSON.stringify({
      type: 'broadcast',
      channel: CHANNEL,
      message: { type: 'exec', code }
    }));
    console.log('[figma-send] Comando enviado ao Figma.');
  }

  if (msg.type === 'broadcast' && msg.message) {
    if (msg.message.type === 'done') {
      console.log('[figma-send] Figma executou com sucesso.');
      ws.close();
      process.exit(0);
    }
    if (msg.message.type === 'error') {
      console.error('[figma-send] Erro no Figma:', msg.message.message);
      ws.close();
      process.exit(1);
    }
  }
});

ws.on('error', (err) => {
  console.error('[figma-send] Nao foi possivel conectar ao relay:', err.message);
  process.exit(1);
});

setTimeout(() => {
  console.error('[figma-send] Timeout — sem resposta do Figma em 15s.');
  ws.close();
  process.exit(1);
}, 15000);
