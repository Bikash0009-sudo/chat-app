import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import oneToOneChat from "./sockets/chat.js";
import roomChat from "./sockets/room.js"





dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

// attach modules
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  oneToOneChat(io, socket);
  roomChat(io,socket);
});

server.listen(5000, () => {
  console.log("Server running on 5000");
});