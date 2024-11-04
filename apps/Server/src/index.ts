import express from 'express';
import cors from 'cors';
import { Server } from 'colyseus';
import { createServer } from 'http';
import { GameRoom } from './utils/Room';
import { userRouter } from './Routes/user';
import cookieParser from 'cookie-parser';
import { SpaceRouter } from './Routes/spaces';
import { AdminRouter } from './Routes/admin';
import { prisma } from './utils/db';

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

app.use(cookieParser());

// const httpServer = createServer(app);

// const gameServer = new Server({
//     server : httpServer
// })

// gameServer.define("game", GameRoom);

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});


app.get("/elements", async (req, res) => {
    const elements = await prisma.element.findMany();
    res.json({ 
        elements : elements.map(e => ({
            id: e.id,
            imageUrl: e.imageUrl,
            width: e.width,
            height: e.height,
            static: e.static
        }))
    });
});

app.get("/avatars", async (req, res) => {
    const avatars = await prisma.avatar.findMany();
    res.json({ 
        avatars : avatars.map(a => ({
            id: a.id,
            name: a.name,
            imageUrl: a.imageUrl
        })) 
    });
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/spaces", SpaceRouter);
app.use("/api/v1/admin", AdminRouter);