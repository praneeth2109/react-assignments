import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001;

// Seed initial messages matching the reference screenshot
let messages = [
  {
    id: "seed-1",
    user: "PubNub Bot",
    text: "Welcome to Team Chat. 👏👏 Send a message now to start interacting with other users in the app. ⬇️",
    timestamp: "12:16",
    likes: 1,
    mentions: []
  },
  {
    id: "seed-2",
    user: "Alan",
    text: "Hey everyone!",
    timestamp: "17:28",
    likes: 0,
    mentions: []
  },
  {
    id: "seed-3",
    user: "Elin",
    text: "Oh hi, Gregory! Rolande is around, too...",
    timestamp: "17:30",
    likes: 2,
    mentions: ["Alan"]
  }
];

io.on("connection", (socket) => {
  console.log(`[Socket.io] Client connected: ${socket.id}`);

  // Send current message history to newly connected client
  socket.emit("init_messages", messages);

  // Handle incoming new message
  socket.on("send_message", (messageData) => {
    const newMessage = {
      id: messageData.id || `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      user: messageData.user,
      text: messageData.text,
      timestamp: messageData.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      likes: messageData.likes || 0,
      mentions: messageData.mentions || []
    };

    messages.push(newMessage);

    if (messages.length > 200) {
      messages.shift();
    }

    io.emit("receive_message", newMessage);
  });

  // Handle like toggle / increment
  socket.on("like_message", ({ messageId }) => {
    const target = messages.find(m => m.id === messageId);
    if (target) {
      target.likes += 1;
      io.emit("message_liked", { messageId: target.id, likes: target.likes });
    }
  });

  socket.on("disconnect", () => {
    console.log(`[Socket.io] Client disconnected: ${socket.id}`);
  });
});

app.get("/api/messages", (req, res) => {
  res.json(messages);
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", connectedClients: io.engine.clientsCount });
});

server.listen(PORT, () => {
  console.log(`🚀 Chat WebSocket server is running on http://localhost:${PORT}`);
});
