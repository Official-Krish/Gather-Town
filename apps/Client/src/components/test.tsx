import { useEffect, useState } from 'react';
import { Client, Room } from 'colyseus.js';

const Test = () => {
  const [room, setRoom] = useState<Room | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [players, setPlayers] = useState<{ [id: string]: { x: number, y: number } }>({});


  useEffect(() => {
    const client = new Client('ws://localhost:3000'); // Backend server WebSocket URL

    const connectToRoom = async () => {
      const newRoom = await client.joinOrCreate("game"); // Room name from backend
      setRoom(newRoom);

      // Listen for messages (e.g., playerMoved events)
      newRoom.onMessage("playerMoved", (message) => {
        console.log("Player Moved:", message);
      });
    };

    connectToRoom();

    return () => {
      room?.leave();
    };
  }, []);

  useEffect(() => {
    if (room) {
      room.onMessage("playerMoved", (message) => {
        setPlayers((prevPlayers) => ({
          ...prevPlayers,
          [message.clientId]: message.position // Update the position of the player
        }));
      });
    }
  }, [room]);

  const handleKeyPress = (e: KeyboardEvent) => {
    let newPos = { ...position };
    switch (e.key) {
      case 'ArrowUp':
        newPos.y -= 10; break;
      case 'ArrowDown':
        newPos.y += 10; break;
      case 'ArrowLeft':
        newPos.x -= 10; break;
      case 'ArrowRight':
        newPos.x += 10; break;
      default:
        return;
    }
    setPosition(newPos);
    room?.send("move", { position: newPos });
    };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [position]);

  return (
    <div>
      <h1>Player Movement</h1>
      {Object.keys(players).map((id) => (
        <div key={id} style={{ top: players[id].y, left: players[id].x, position: 'absolute' }}>
          {/* Replace this with an avatar */}
          🧑 {/* or a custom image */}
        </div>
      ))}
    </div>
  );
  
};

export default Test;
