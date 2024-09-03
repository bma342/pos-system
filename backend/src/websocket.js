const WebSocket = require('ws');

const setupWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('New WebSocket connection');

    ws.on('message', (message) => {
      console.log('Received:', message);
    });

    ws.send('Welcome to the WebSocket server!');
  });

  return wss;
};

module.exports = setupWebSocket;

// Use in app.js
const http = require('http');
const setupWebSocket = require('./websocket');

const server = http.createServer(app);
const wss = setupWebSocket(server);

// frontend/src/services/websocket.ts
export class WebSocketService {
  private socket: WebSocket;

  constructor(url: string) {
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    this.socket.onmessage = (event) => {
      console.log('Received message:', event.data);
      // Handle incoming messages
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
  }

  sendMessage(message: string) {
    this.socket.send(message);
  }
}

// Use in ExecutiveDashboard.tsx
const websocket = new WebSocketService('ws://localhost:3000');
