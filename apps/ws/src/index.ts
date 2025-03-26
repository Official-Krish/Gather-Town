import { WebSocketServer } from 'ws';
import { setupWebSocketServer } from './user';

const wss = new WebSocketServer({ port: 3001 });
setupWebSocketServer(wss);