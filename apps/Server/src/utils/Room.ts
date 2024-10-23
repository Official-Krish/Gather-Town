import { Room, Client } from 'colyseus';

export class GameRoom extends Room {
  onCreate(options: any) {
    console.log("Room created!", options);
    this.onMessage("move", (client, message) => {
      this.broadcast("playerMoved", { 
        clientId: client.sessionId,
        position: message.position
       });
    });
  }

  onJoin(client: Client) {
    console.log(client.sessionId, "joined");
  }

  onLeave(client: Client) {
    console.log(client.sessionId, "left");
  }

  onDispose() {
    console.log("Room disposed");
  }
}
