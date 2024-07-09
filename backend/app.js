const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);

app.use(cors());

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let connectedUsers = [];

io.on("connection", (socket) => {
  userActive = {};

  //detección de conexión
  console.log("a user connected");
  // detección de desconexión
  socket.on("disconnect", () => {
    console.log("user disconnected", userActive);
    io.emit("userConnection", {
      msg: userActive.nickname + " se ha desconectado",
    });
  });
  //detección de nuevo evento
  socket.on("login", (user) => {
    console.log(user);
    userActive = user;
    connectedUsers.push(user);
    io.emit("signin", connectedUsers);
  });

  socket.on("msg", (msg) => {
    console.log(msg);
    console.log(
      "He recibido un nuevo mensaje de ",
      msg.nickname,
      "que dice: ",
      msg.msg
    );
    io.emit("msg", msg);
  });

  socket.on("status", (status) => {
    console.log("status", status);
    io.emit("status", status);
  });
});

app.get("/", (req, res) => {
  res.send("<h1>Websockets!</h1>");
});

server.listen(3333, () => {
  console.log("WEB SERVER listening on *:3333");
});
