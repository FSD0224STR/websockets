const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);

app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Websockets!</h1>");
});

server.listen(3333, () => {
  console.log("WEB SERVER listening on *:3333");
});
