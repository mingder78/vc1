// server.js
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 });
let clients = [];

wss.on("connection", ws => {
  clients.push(ws);
  console.log("Client connected. Total:", clients.length);

  ws.on("message", msg => {
    // broadcast to all except sender
    for (const client of clients) {
      if (client !== ws && client.readyState === client.OPEN) {
        client.send(msg);
      }
    }
  });

  ws.on("close", () => {
    clients = clients.filter(c => c !== ws);
    console.log("Client disconnected. Total:", clients.length);
  });
});

