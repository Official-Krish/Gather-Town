import { Router } from "express";
import { AddElementSchema, CreateElementSchema, CreateSpaceSchema, deleteElementSchema } from "../types/schema";
import { prisma } from "../utils/db";
import { userMiddleware } from "../utils/middleware/user";

export const SpaceRouter = Router(); 

SpaceRouter.post("/", userMiddleware,async (req, res) => {
    const parsedData = CreateSpaceSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ error: "Invalid data" });
        return;
    }

    if(!parsedData.data.mapId){
        const space =await prisma.space.create({
            data: {
                name: parsedData.data.name,
                width: parsedData.data.dimensions.split("x")[0] as unknown as number,
                height: parsedData.data.dimensions.split("x")[1] as unknown as number,
                creatorId: req.userId as string,
            }
        });
        res.json({msg: "Space created successfully", spaceId: space.id});
    }
    else { 
        const map = await prisma.map.findFirst({
            where: {
                id: parsedData.data.mapId
            }, select: {
                mapElements: true,
                width: true,
                height: true
            }
        })
        if (!map) {
            res.status(400).json({message: "Map not found"})
            return
        }
        let space = await prisma.$transaction(async () => {
            const space = await prisma.space.create({
                data: {
                    name: parsedData.data.name,
                    width: map.width,
                    height: map.height,
                    creatorId: req.userId!,
                }
            });
    
            await prisma.spaceElements.createMany({
                data: map.mapElements.map(e => ({
                    spaceId: space.id,
                    elementId: e.elementId,
                    x: e.x!,
                    y: e.y!
                }))
            })
    
            return space;
    
        })
        res.json({spaceId: space.id})
    }
});

SpaceRouter.delete("/:spaceId", async (req, res) => {
    const space = await prisma.space.findUnique({
        where: {
            id: req.params.spaceId
        },
        select: {
            creatorId: true
        }
    });

    if(!space){
        res.status(404).json({msg: "Space not found"})
        return
    }

    if (space?.creatorId !== req.userId) {
        res.status(401).json({msg: "Unauthorized"})
        return
    }
    await prisma.space.delete({
        where: {
            id: req.params.spaceId
        }
    });
    res.json({msg: "Space deleted successfully"})

});


SpaceRouter.get("/all", userMiddleware, async (req, res) => {
    const spaces = await prisma.space.findMany({
        where: {
            creatorId: req.userId
        }
    });
    res.json({
        spaces: spaces.map(s => ({
            id: s.id,
            name: s.name,
            thumbnail: s.thumbnail,
            dimensions: `${s.width}x${s.height}`
        }))
    })
});

SpaceRouter.post("/element", userMiddleware , async (req, res) => {
    const parsedData = AddElementSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ error: "Invalid data" });
        return;
    }
    const space = await prisma.space.findUnique({
        where: {
            id: parsedData.data.spaceId,
            creatorId: req.userId
        },
        select: {
            width: true,
            height: true
        }
    });

    if(!space){
        res.status(404).json({msg: "Space not found"})
        return
    }
    const element = await prisma.spaceElements.create({
        data: {
            spaceId: parsedData.data.spaceId,
            elementId: parsedData.data.elementId,
            x: parsedData.data.x,
            y: parsedData.data.y
        }
    });

    res.json({msg: "Element added successfully", elementId: element.id});
});

SpaceRouter.delete("/element", userMiddleware, async (req, res) => {
    const parsedData = deleteElementSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ error: "Invalid data" });
        return;
    }
    const spaceElement = await prisma.spaceElements.findFirst({
        where: {
            id: parsedData.data.id
        }, 
        include: {
            space: true
        }
    })
    if (!spaceElement?.space.creatorId || spaceElement.space.creatorId !== req.userId) {
        res.status(403).json({message: "Unauthorized"})
        return
    }
    await prisma.spaceElements.delete({
        where: {
            id: parsedData.data.id
        }
    })
    res.json({message: "Element deleted"})
});

SpaceRouter.get("/:spaceId", async (req, res) => {
    const space = await prisma.space.findUnique({
        where: {
            id: req.params.spaceId
        },
        include: {
            elements: {
                include: {
                    element: true
                }
            },
            creator: true
        }
    });  
    
    if (!space) {
        res.status(404).json({message: "Space not found"})
        return
    }

    res.json({
        dimensions: `${space.width}x${space.height}`,
        elements: space.elements.map(e => ({
            id: e.id,
            element : {
                id: e.element.id,
                imageUrl: e.element.imageUrl,
                width: e.element.width,
                height: e.element.height,
                static: e.element.static
            },
            x: e.x,
            y: e.y
        })),
    })
});