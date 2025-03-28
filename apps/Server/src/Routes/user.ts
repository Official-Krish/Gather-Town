import * as dotenv from 'dotenv';
dotenv.config();

import { Router } from "express";
import {hash, compare} from "../scrypt";
import jwt from 'jsonwebtoken';
import { LoginSchema, SignupSchema, UpdateAvatar, UpdateMetaDataSchema,  } from '../types/schema';
import { userMiddleware } from '../middleware/user';
import client from "@repo/db/client";

export const userRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret";

userRouter.post("/signup", async (req, res) => {
    const body = req.body;
    const parsedData = SignupSchema.safeParse(body);

    if (!parsedData.success) {
        res.status(400).json({ error: "Invalid data" });
        return;
    }

    const userExist = await client.user.findFirst({
        where: {
            username: parsedData.data.username,
        }
    });

    if (userExist) {
        res.status(400).json({ msg: "User already exists" });
        return;
    } else {
        try{
            const hashedPassword = await hash(parsedData.data.password);
            const user = await client.user.create({
                data: {
                    name: parsedData.data.name,  
                    username: parsedData.data.username,
                    password: hashedPassword,
                    role: parsedData.data.role,
                    avatarId: parsedData.data.AvatarId ?? "",
                }
            });

            const token = jwt.sign(
                {
                    userId: user.id,
                    role: user.role
                },
                JWT_SECRET
            );
            res.cookie('token', token, { httpOnly: true });
            res.status(200).json({ msg: "User created successfully" , token : token , userId : user.id});
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

    const user = await client.user.findFirst({
        where: {
            username: parsedData.data.username,
        }
    });

    if (!user) {
        res.status(400).json({ msg: "Invalid credentials" });
        return;
    } else {
        try{
            const isPasswordValid = await compare(parsedData.data.password, user.password);
            if (!isPasswordValid) {
                res.status(400).json({ msg: "Invalid credentials" });
                return;
            } else {
                const token = jwt.sign(
                    {
                        userId: user.id,
                        role: user.role,
                    },
                    JWT_SECRET
                );

                res.cookie('token', token, { httpOnly: true });
                res.status(200).json({ msg : "login successful" , token : token , userId : user.id});
            }
        }catch(error){
            res.status(500).json({ msg: "Internal server error" });
        }
    }
});

userRouter.get("/metadata/bulk", async (req, res) => {
    const userIdString = (req.query.ids ?? "[]") as string;
    const userIds = (userIdString).slice(1, userIdString?.length - 1).split(",");
    try{ 
        const metaData = await client.user.findMany({
            where: {
                id: {
                    in: userIds
                }
            },
            select: {
                id: true,
                avatar: true
            }
        });

        res.json({
            avatars : metaData.map(m => ({
                userId: m.id,
                avatarId: m.avatar?.imageUrl
            }))
        })
    } catch(error){
        res.status(500).json({ msg: "Internal server error" });
    }
})

userRouter.post("/avatar", userMiddleware, async (req, res) => {
    const parsedData = UpdateAvatar.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ error: "Invalid data" });
        return;
    }
    try{
        await client.user.update({
            where: {
                id : req.userId
            },
            data : {
                avatarId : parsedData.data.avatarId,
            }
        });
        res.status(200).json({ msg: "AvatarId updated successfully" });
    } catch(error){
        res.status(500).json({ msg: "Internal server error" });
    }
})

userRouter.get("/metadata", userMiddleware, async (req, res) => {
    const user = await client.user.findUnique({
      where: {
        id: req.userId,
      },
    });
  
    if (!user) {
      res.status(404).json({ message: "User not found 2" });
      return;
    }
  
    const avatar = await client.avatar.findFirst({
      where: { id: user.avatarId || ""},
    });
    console.log("avatar", avatar);
  
    res.json({
      user,
      avatar,
    });
});

userRouter.post("/:UserId", userMiddleware, async (req, res) => {
    const user = await client.user.findUnique({
      where: {
        id: req.params.UserId,
      },
    });
    console.log("user", user);
  
    if (!user) {
      res.status(404).json({ message: "User not found 1" });
      return;
    }
  
    res.json({
      user,
    });
});
  

userRouter.post("/metadata", userMiddleware, async (req, res) => {
    const parsedData = UpdateMetaDataSchema.safeParse(req.body);
    if (!parsedData.success) {
      console.log("parsed data incorrect");
      res.status(400).json({ message: "Validation failed" });
      return;
    }
    try {
      const user = await client.user.update({
        where: {
          id: req.userId,
        },
        data: {
          avatarId: parsedData.data.avatarId,
          name: parsedData.data.name,
        },
        select: {
          username: true,
          name: true,
          avatarId: true,
          id: true,
          role: true,
        },
      });
      res.json({ message: "Metadata updated", user });
    } catch (e) {
      console.log("error");
      res.status(400).json({ message: "Internal server error" });
    }
});