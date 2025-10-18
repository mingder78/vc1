import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 });
console.log("🔊 WebSocket server running on ws://localhost:3000");

wss.on("connection", ws => {
  console.log("Client connected");

  ws.on("message", data => {
    // Broadcast to all other clients
    for (const client of wss.clients) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    }
  });

  ws.on("close", () => console.log("Client disconnected"));
});

