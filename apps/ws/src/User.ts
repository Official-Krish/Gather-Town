import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { WebSocket } from "ws";
import client from "@repo/db/src"
import { RoomManager } from "./RoomManager";

function getRandomString(length: number) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

export class User {
    public id: string;
    public userId?: string;
    private spaceId?: string;
    private x: number;
    private y: number;
    private ws: WebSocket;

    constructor(ws : WebSocket){
        this.id = getRandomString(10);
        this.x = 0;
        this.y = 0;
        this.ws = ws;
        this.initHandlers();
    }

    initHandlers(){
        this.ws.on("message", async (data) => {
            const parsedData = JSON.parse(data.toString());

            switch(parsedData.type){
                case "join":
                    const spaceId = parsedData.payload.spaceId; 
                    const token = parsedData.payload.token;
                    const userId = (jwt.verify(token, process.env.JWT_SECRET || "secret") as JwtPayload).userId;

                    if(!userId){
                        this.ws.send(JSON.stringify({type: "error", payload: "Invalid token"}));
                        this.ws.close();
                        return;
                    }

                    this.userId = userId;
                    const space = await client.space.findFirst({where: {id: spaceId}});
                    if(!space){
                        this.ws.send(JSON.stringify({type: "error", payload: "Invalid space"}));
                        this.ws.close();
                        return;
                    }

                    this.spaceId = spaceId;
                    RoomManager.getInstance().addUser(spaceId, this);
                    this.x = Math.floor(Math.random() * space.width);
                    this.y = Math.floor(Math.random() * space.height);
                    this.send({
                        type: "space-joined",
                        payload: {
                            spawn: {
                                x: this.x,
                                y: this.y
                            },
                        },
                        users: RoomManager.getInstance().rooms.get(spaceId)?.filter((e) => e.id !== this.id).map((e) => ({id: e.id})) ?? []
                    })

                    RoomManager.getInstance().broadcast({
                        type: "user-joined",
                        payload: {
                            userId: this.userId,
                            x: this.x,
                            y: this.y
                        }
                    }, this, this.spaceId!);
                    break;

                case "move": 
                    const moveX = parsedData.payload.x;
                    const moveY = parsedData.payload.y;
                    const xDisplacement = Math.abs(moveX - this.x);
                    const yDisplacement = Math.abs(moveY - this.y);

                    if((xDisplacement === 1 && yDisplacement === 0) || (xDisplacement === 0 && yDisplacement === 1)){
                        this.x = moveX;
                        this.y = moveY;
                        RoomManager.getInstance().broadcast({
                            type: "movement",
                            payload: {
                                x: this.x,
                                y: this.y
                            }
                        }, this, this.spaceId!);
                        return;
                    }
                    this.send({
                        type: "movemnt-rejected",
                        payload: {
                            x: this.x,
                            y: this.y
                        }
                    })
            }
        })
    }

    send(payload: any){
        this.ws.send(JSON.stringify(payload));
    }

    destroy(){
        RoomManager.getInstance().broadcast({
            type: "user-left",
            payload: {
                userId: this.userId
            }
        },  this, this.spaceId!);
        RoomManager.getInstance().removeUser(this, this.spaceId!);
    }
}