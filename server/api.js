const express = require('express');
var app = express();
// var connect = require("connect");
// var app = connect();
const bodyParser = require('body-parser');
// const serverless = require("serverless-http");
var cors = require('cors');
//
const APP_NAME = process.env.REACT_APP_APP_NAME || 'Chat App';
const PORT = process.env.PORT || 3001;

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
    members: ['Victoria', 'John'],
  },
];
const MOCK_MSGS = [
  {
    message: 'Welcome to ' + APP_NAME,
    author: 'Victoria',
    time: 1603741045962,
    roomId: 'home',
  },
  {
    message: "What's up",
    gif: null,
    author: 'Victoria',
    time: 1603741045963,
    roomId: 'room2',
  },
];
var messages = MOCK_MSGS;

var rooms = MOCK_ROOMS; //['string'];
app.use(cors());

const appendMsgs = msg => {
  messages = [...messages, msg];
  return messages;
};
const appendRooms = room => {
  //TODO validate room type
  rooms = [...rooms, room];
  return rooms;
};
const appendUsers = name => {
  // All users should always exist in the home room
  rooms = rooms.map(room =>
    room.id === 'home' ? { ...room, members: [...room.members, name] } : room
  );
  let homeRoom = rooms.find(room => room.id === 'home');

  return homeRoom.members;
};

app.get('/*.html', (req, res) => {
  res.sendFile(__dirname + '../build/index.html');
});
app.get('/socket.io', (req, res) => {
  io.emit('FromAPI', JSON.stringify(messages));
  res.end(JSON.stringify(messages), 200);
});
app.post('/api/messages', (req, res) => {
  io.emit('FromAPI', JSON.stringify(req.body));
  messages = appendMsgs(req.body);
  res.send(JSON.stringify(messages), 200);
});
app.post('/api/names', (req, res) => {
  res.send(JSON.stringify(appendUsers(req.body.name)), 200);
});
app.get('/api/messages', (req, res) => {
  res.send(JSON.stringify(messages), 200);
});
app.post('/api/rooms', (req, res) => {
  io.emit('POST_ROOM', JSON.stringify(req.body));
  rooms = appendRooms(req.body);
  res.send(JSON.stringify(rooms), 200);
});
app.get('/api/rooms', (req, res) => {
  res.send(JSON.stringify(rooms), 200);
});
app.get('/api/rooms/:id/messages', (req, res) => {
  const roomId = req.params.id;
  const roomMsgs = messages.filter(msg => msg.roomId === roomId);
  res.send(JSON.stringify(roomMsgs), 200);
});
io.on('connection', socket => {
  io.emit('NewUser');
  socket.broadcast.emit('NewUser');
  socket.on('NewRoom', data => {
    rooms = appendRooms(data);
    io.emit('RoomCreated', JSON.stringify(rooms));
    socket.broadcast.emit('RoomCreated', JSON.stringify(rooms));
  });
  socket.on('NewMessage', data => {
    messages = appendMsgs(data);
    io.emit('MsgCreated', JSON.stringify(messages));
    socket.broadcast.emit('MsgCreated', JSON.stringify(messages));
  });
});
http.listen(PORT, () => {
  console.log('listening on *:' + PORT);
});
