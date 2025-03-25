import express from 'express';
import cors from 'cors';
import { userRouter } from './Routes/user';
import cookieParser from 'cookie-parser';
import { SpaceRouter } from './Routes/spaces';
import { AdminRouter } from './Routes/admin';
import { getRouter } from './Routes/get';

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

app.use(cookieParser());

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/spaces", SpaceRouter);
app.use("/api/v1/admin", AdminRouter);
app.use("/api/v1", getRouter);