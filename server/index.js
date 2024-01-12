const express = require("express");
const cors = require("cors");
const http = require("node:http");
const { Server } = require("socket.io");

require("dotenv").config();

const app = express();
app.use(cors());
const port = process.env.PORT || 8000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    methods: ["GET", "POST"],
    origin: process.env.CLIENT_ADDRESS,
  },
});

io.on("connection", (socket) => {
  console.log(
    `${new Date().toLocaleTimeString()} socket connection ${socket.id}`
  );
  // for joining the room:- data has room id
  socket.on("join_room", (data) => {
    socket.join(data);
    // console.log(`user with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    // sending the messages to all members of particular room id
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(port, () => {
  console.log("server is running: " + port);
});
