import type { User } from "./User";

export class RoomManager {
    rooms: Map<string, User[]> = new Map();
    static instance: RoomManager;

    private constructor() {
        this.rooms = new Map();
    }

    static getInstance() {
        if (!RoomManager.instance) {
            RoomManager.instance = new RoomManager();
        }

        return RoomManager.instance;
    }

    public addUser(spaceId: string, user: User) {
        if (!this.rooms.has(spaceId)) {
            this.rooms.set(spaceId, [user]);
            return;
        }

        this.rooms.set(spaceId, [...(this.rooms.get(spaceId) ?? []), user]);
    }

    public removeUser(user: User, spaceId: string){
        if(!this.rooms.has(spaceId)){
            return;
        }

        this.rooms.set(spaceId, (this.rooms.get(spaceId)?.filter((e) => 
            e.id !== user.id) ?? []
        ))
    }

    public broadcast(message : any, user: User, roomId : string){
        if(!this.rooms.has(roomId)){
            return;
        }

        this.rooms.get(roomId)?.forEach((e) => {
            if(e.id !== user.id){
                e.send(message);
            }
        })
    }
}