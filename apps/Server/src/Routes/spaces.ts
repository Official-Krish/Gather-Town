import { Router } from "express";
import { AddElementSchema, CreateSpaceSchema, deleteElementSchema } from "../types/schema";
import client from "@repo/db/client";
import { userMiddleware } from "../middleware/user";

export const SpaceRouter = Router(); 

SpaceRouter.post("/", userMiddleware, async (req, res) => {
    const parsedData = CreateSpaceSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ error: "Invalid data" });
        return;
    }

    if(!parsedData.data.mapId){
        const space = await client.space.create({
            data: {
                name: parsedData.data.name,
                width: parseInt(parsedData.data.dimensions.split("x")[0]),
                height: parseInt(parsedData.data.dimensions.split("x")[1]),
                creatorId: req.userId as string,
                thumbnail: parsedData.data.thumbnail,
            }
        });
        res.json({msg: "Space created successfully", spaceId: space.id});
    }
    else { 
        const map = await client.map.findFirst({
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
            return;
        }
        let space = await client.$transaction(async () => {
            const space = await client.space.create({
                data: {
                    name: parsedData.data.name,
                    width: map.width,
                    height: map.height,
                    creatorId: req.userId!,
                    thumbnail: parsedData.data.thumbnail,
                }
            });
    
            await client.spaceElements.createMany({
                data: map.mapElements.map(e => ({
                    spaceId: space.id,
                    elementId: e.elementId,
                    x: e.x!,
                    y: e.y!
                }))
            })
    
            return space;
    
        })
        res.json({spaceId: space.id, space: space})
    }
});

SpaceRouter.delete("/element", userMiddleware, async (req, res) => {
    const parsedData = deleteElementSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ error: "Invalid data" });
        return;
    }
    const spaceElement = await client.spaceElements.findFirst({
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
    await client.spaceElements.delete({
        where: {
            id: parsedData.data.id
        }
    })
    res.json({message: "Element deleted"})
});

SpaceRouter.delete("/:spaceId", userMiddleware, async (req, res) => {
    const space = await client.space.findUnique({
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

    if (space.creatorId !== req.userId) {
        res.status(401).json({msg: "Unauthorized"})
        return
    }

    await client.spaceElements.deleteMany({
        where: {
            spaceId: req.params.spaceId
        }
    });
    
    await client.space.delete({
        where: {
            id: req.params.spaceId
        }
    });
    res.json({msg: "Space deleted successfully"})

});


SpaceRouter.get("/all", userMiddleware, async (req, res) => {
    const spaces = await client.space.findMany({
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
    const space = await client.space.findUnique({
        where: {
            id: parsedData.data.spaceId,
            creatorId: req.userId
        },
        select: {
            width: true,
            height: true
        }
    });


    if(req.body.x < 0 || req.body.y < 0 || req.body.x > space?.width! || req.body.y > space?.height!) {
        res.status(400).json({message: "Point is outside of the boundary"});
        return;
    }

    if(!space){
        res.status(404).json({msg: "Space not found"})
        return
    }
    const element = await client.spaceElements.create({
        data: {
            spaceId: parsedData.data.spaceId,
            elementId: parsedData.data.elementId,
            x: parsedData.data.x,
            y: parsedData.data.y
        }
    });

    res.json({msg: "Element added successfully", elementId: element.id});
});


SpaceRouter.get("/:spaceId", async (req, res) => {
    const space = await client.space.findUnique({
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
        creatorId: space.creatorId,
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