const express = require("express");
var app = express();
var connect = require("connect");
// var app = connect();
const bodyParser = require("body-parser");
const serverless = require("serverless-http");

// Route to Netlify for deploying
const router = express.Router();
router.post("/", (req, res) => res.json({ postBody: req.body }));
app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda

app.use(
  express.static("/Users/victoriabernard/my-repos/raise-interview/build")
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var http = require("http").createServer(app);
var io = require("socket.io")(http);
// const socket = io();

var messages = [];

const appendMsgs = (msg) => {
  console.log("append", msg.message);
  messages = [...messages, msg];
  return messages;
};
http.listen(3001, () => {
  console.log("listening on *:3001");
});
app.get("/*.html", (req, res) => {
  //   res.sendFile(__dirname + "../build/index.html");
  res.sendFile(
    "/Users/victoriabernard/my-repos/raise-interview/build/index.html"
  );
});
app.get("/socket.io", (req, res) => {
  console.log("get msg from socket.io");
  io.emit("FromAPI", JSON.stringify(messages));
  res.end(JSON.stringify(messages), 200);
});
app.post("/api/messages", (req, res) => {
  console.log("api, ", req.body);
  // io.emit("FromAPI", 22);
  io.emit("FromAPI", JSON.stringify(req.body));
  messages = appendMsgs(req.body);
  res.send(JSON.stringify(messages), 200);
});
app.get("/api/messages", (req, res) => {
  res.send(JSON.stringify(messages), 200);
});
io.on("connection", (socket) => {
  console.log("a user connected");
  io.emit("NewUser");
  socket.broadcast.emit("NewUser");
  socket.on("disconnect", (reason) => {
    console.log("user disconnected", reason);
  });
  socket.on("FromAPI", (data) => {
    console.log("FromAPI");
    console.log("data", data);
  });
  socket.on("MsgReceived", (data) => {
    console.log("MsgReceived here");
    console.log("data", data);
  });
  socket.on("NewMessage", (data) => {
    console.log("NewMessage");
    console.log("NewMessage data", data);
    messages = appendMsgs(data);
    io.emit("MsgReceived", JSON.stringify(messages));
    socket.broadcast.emit("MsgReceived", JSON.stringify(messages));
    io.emit("NewUser");
    socket.broadcast.emit("NewUser");
    console.log(messages);
    console.log("succccess on emitted", messages);
    // res.send(JSON.stringify(messages), 200);
  });
});
module.exports.handler = serverless(app);
