import { Router } from "express";
import { prisma } from "../utils/db";

export const getRouter = Router();

getRouter.get("/elements", async (req, res) => {
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

getRouter.get("/avatars", async (req, res) => {
    const avatars = await prisma.avatar.findMany();
    res.json({ 
        avatars : avatars.map(a => ({
            id: a.id,
            name: a.name,
            imageUrl: a.imageUrl
        })) 
    });
});