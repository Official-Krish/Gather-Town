import express from 'express';
import cors from 'cors';
import { Server } from 'colyseus';
import { createServer } from 'http';
import { GameRoom } from './utils/Room';

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

const httpServer = createServer(app);

const gameServer = new Server({
    server : httpServer
})

gameServer.define("game", GameRoom);

httpServer.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});