import express from 'express';
import cors from 'cors';
import { Server } from 'colyseus';
import { createServer } from 'http';
import { GameRoom } from './utils/Room';
import { userRouter } from './Routes/user';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

app.use(cookieParser());

const httpServer = createServer(app);

const gameServer = new Server({
    server : httpServer
})

gameServer.define("game", GameRoom);

httpServer.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});

app.use("/api/v1/user", userRouter);