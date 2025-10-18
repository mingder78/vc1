// server.js
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", (ws, req) => {
  console.log("✅ Client connected:", req.socket.remoteAddress);

  ws.on("message", (data) => {
    console.log("🎧 Received chunk:", data.byteLength, "bytes");

    // Broadcast to others
    for (const client of wss.clients) {
      if (client !== ws && client.readyState === client.OPEN) {
        client.send(data);
      }
    }
  });

  ws.on("close", () => console.log("❌ Client disconnected"));
});

