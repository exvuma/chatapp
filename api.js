const express = require('express');
var app = express();
// var connect = require("connect");
// var app = connect();
const bodyParser = require('body-parser');
// const serverless = require("serverless-http");
var cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const APP_NAME = process.env.REACT_APP_APP_NAME || 'Chat App';
// import { MOCK_ROOMS } from './mocks';

// Route to Netlify for deploying
// const router = express.Router();
// router.post("/", (req, res) => res.json({ postBody: req.body }));
app.use(bodyParser.json());
// app.use("/server/functions", router); // path must route to lambda

app.use(express.static('./client/build'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// app.options("*", cors());

const MOCK_ROOMS = [
  {
    name: 'Room 1',
    id: 'room1',
    author: 'John',
    time: 1603741045962,
    members: ['Victoria', 'John'],
  },
  {
    name: 'Room 2',
    id: 'room2',
    author: 'Victoria',
    time: 1603741045962,
    members: ['Victoria', 'John'],
  },
  {
    name: 'Home',
    id: 'home',
    author: 'Home',
    time: 1603741045962,
    members: [],
  },
];
const MOCK_MSGS = [
  {
    message: 'Welcome to ' + APP_NAME,
    author: 'Victoria',
    time: 1603741045962,
    roomId: 'home',
  },
  { message: 'Hi there', author: 'John', time: 1603741045962, roomId: 'room1' },
  { message: 'Hi there', author: 'John', time: 1603741045962, roomId: 'room1' },
  { message: 'Hi there', author: 'John', time: 1603741045962, roomId: 'room1' },
  {
    message: "What's up",
    author: 'Victoria',
    time: 1603741045962,
    roomId: 'room2',
  },
];
var messages = MOCK_MSGS;

var rooms = MOCK_ROOMS; //['string'];
app.use(cors());

const appendMsgs = msg => {
  console.log('append', msg.message);
  messages = [...messages, msg];
  return messages;
};
const appendRooms = room => {
  console.log('append', room);
  rooms = [...rooms, room];
  return rooms;
};

app.get('/*.html', (req, res) => {
  //   res.sendFile(__dirname + "../build/index.html");
  res.sendFile(
    '/Users/victoriabernard/my-repos/raise-interview/build/index.html'
  );
});
app.get('/socket.io', (req, res) => {
  console.log('get msg from socket.io');
  io.emit('FromAPI', JSON.stringify(messages));
  res.end(JSON.stringify(messages), 200);
});
app.post('/api/messages', (req, res) => {
  console.log('api, ', req.body);
  // io.emit("FromAPI", 22);
  io.emit('FromAPI', JSON.stringify(req.body));
  messages = appendMsgs(req.body);
  res.send(JSON.stringify(messages), 200);
});
app.get('/api/messages', (req, res) => {
  res.send(JSON.stringify(messages), 200);
});
app.post('/api/rooms', (req, res) => {
  console.log('posted room, ', req.body);
  // io.emit("FromAPI", 22);
  io.emit('POST_ROOM', JSON.stringify(req.body));
  rooms = appendRooms(req.body);
  res.send(JSON.stringify(rooms), 200);
});
app.get('/api/rooms', (req, res) => {
  res.send(JSON.stringify(rooms), 200);
});
app.get('/api/rooms/:id/messages', (req, res) => {
  console.log(req.params.id);
  const roomId = req.params.id;
  const roomMsgs = messages.filter(msg => msg.roomId === roomId);
  res.send(JSON.stringify(roomMsgs), 200);
});
io.on('connection', socket => {
  // console.log("a user connected");
  io.emit('NewUser');
  socket.broadcast.emit('NewUser');
  // socket.on("disconnect", (reason) => {
  // console.log("user disconnected", reason);
  // });
  socket.on('NewRoom', data => {
    rooms = appendRooms(data);
    io.emit('RoomCreated', JSON.stringify(rooms));
    socket.broadcast.emit('RoomCreated', JSON.stringify(rooms));
  });
  socket.on('NewMessage', data => {
    console.log('NewMessage data', data);
    messages = appendMsgs(data);
    io.emit('MsgCreated', JSON.stringify(messages));
    socket.broadcast.emit('MsgCreated', JSON.stringify(messages));
    console.log('succccess on emitted', messages);
  });
});
// module.exports.handler = serverless(app);
http.listen(process.env.API_PORT, () => {
  console.log('listening on *:' + process.env.API_PORT);
});
