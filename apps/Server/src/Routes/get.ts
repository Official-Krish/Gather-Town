import { Router } from "express";
import client from "@repo/db/client";

export const getRouter = Router();

getRouter.get("/elements", async (req, res) => {
    const elements = await client.element.findMany();
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
    const avatars = await client.avatar.findMany();
    res.json({ 
        avatars : avatars.map(a => ({
            id: a.id,
            name: a.name,
            imageUrl: a.imageUrl
        })) 
    });
});

getRouter.get("/maps", async (req, res) => {
    const maps = await client.map.findMany();
    res.json({ 
        maps
    });
});