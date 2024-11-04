import { Router } from "express";
import { adminMiddleware } from "../utils/middleware/admin";
import { AddElementSchema, createAvatarSchema, CreateElementSchema, createMapSchema, UpdateElementSchema } from "../types/schema";
import { prisma } from "../utils/db";

export const AdminRouter = Router();

AdminRouter.post("/element", adminMiddleware,async (req, res) => {
    const parsedData = CreateElementSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ error: "Invalid data" });
        return;
    }

    const element = await prisma.element.create({
        data: {
            imageUrl: parsedData.data.imageUrl,
            width: parsedData.data.width,
            height: parsedData.data.height,
            static: parsedData.data.static
        }
    });
    res.json({ msg: "Element created successfully" , id : element.id});
});

AdminRouter.put("/element/:elementId", (req, res) => {
    const parsedData = UpdateElementSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ error: "Invalid data" });
        return;
    }

    prisma.element.update({
        where: {
            id: req.params.elementId
        },
        data: {
            imageUrl: parsedData.data.imageUrl
        }
    });    
    res.json({ msg: "Element updated successfully" });
});

AdminRouter.post("/avatar", async (req, res) => {
    const parsedData = createAvatarSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ error: "Invalid data" });
        return;
    }
    const avatar = await prisma.avatar.create({
        data: {
            name: parsedData.data.name,
            imageUrl: parsedData.data.imageUrl
        }
    });
    res.json({ msg: "Avatar created successfully" , id : avatar.id});
});

AdminRouter.post("/map", async (req, res) => {
    const parsedData = createMapSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ error: "Invalid data" });
        return;
    }

    const map = await prisma.map.create({
        data: {
            name: parsedData.data.name,
            thumbnail: parsedData.data.thumbnail,
            width: parseInt(parsedData.data.dimensions.split("x")[0]),
            height: parseInt(parsedData.data.dimensions.split("x")[1]),
            mapElements: {
                create : parsedData.data.defaultElements.map(e => ({
                    elementId: e.elementId,
                    x: e.x,
                    y: e.y
                }))
            }
        }
    });
    res.json({ msg: "Map created successfully" , id : map.id});
});