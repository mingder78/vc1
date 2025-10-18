import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", ws => {
  console.log("Client connected");

  ws.on("message", data => {
    // Broadcast incoming audio to all other clients
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        console.log(data)
        client.send(data);
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server running on ws://localhost:3000");

