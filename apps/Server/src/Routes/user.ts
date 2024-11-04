import * as dotenv from 'dotenv';
dotenv.config();

import { Router } from "express";
import { prisma } from "../db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginSchema, SignupSchema } from '../types/schema';

export const userRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret";

userRouter.post("/signup", async (req, res) => {
    const body = req.body;
    const parsedData = SignupSchema.safeParse(body);

    if (!parsedData.success) {
        res.status(400).json({ error: "Invalid data" });
        return;
    }

    const userExist = await prisma.user.findFirst({
        where: {
            username: parsedData.data.username,
        }
    });

    if (userExist) {
        res.status(400).json({ msg: "User already exists" });
        return;
    } else {
        try{
            const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);
            const user = await prisma.user.create({
                data: {
                    name: parsedData.data.name,  
                    username: parsedData.data.username,
                    password: hashedPassword,
                    role: parsedData.data.role,
                }
            });

            const token = jwt.sign(
                {
                    email: user.username,
                },
                JWT_SECRET
            );

            res.cookie('token', token);
            res.status(200).json({ msg: "User created successfully" , userId : user.id});
        } catch(error){
            res.status(500).json({ msg: "Internal server error" });
        }
    }
});

userRouter.post("/signin", async (req, res) => {
    const body = req.body;
    const parsedData = LoginSchema.safeParse(body);

    if (!parsedData.success) {
        res.status(400).json({ error: "Invalid data" });
        return;
    }

    const user = await prisma.user.findFirst({
        where: {
            username: parsedData.data.username,
        }
    });

    if (!user) {
        res.status(400).json({ msg: "Invalid credentials" });
        return;
    } else {
        try{
            const isPasswordValid = await bcrypt.compare(parsedData.data.password, user.password);
            if (!isPasswordValid) {
                res.status(400).json({ msg: "Invalid credentials" });
                return;
            } else {
                const token = jwt.sign(
                    {
                        email: parsedData.data.username,
                        role: user.role,
                    },
                    JWT_SECRET
                );

                res.cookie('token', token);
                res.status(200).json({ msg : "login successful" , token : token , userId : user.id});
            }
        }catch(error){
            res.status(500).json({ msg: "Internal server error" });
        }
    }
});