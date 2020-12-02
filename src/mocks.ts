import { RoomType, MsgType } from './types';
export const MOCK_ROOMS: RoomType[] = [
  {
    name: 'Home',
    id: 'home',
    author: 'Home',
    time: 1603741045962,
    members: [],
  },
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
    time: 1603741045963,
    members: ['Victoria', 'John'],
  },
];
export const MOCK_MSGS: MsgType[] = [
  {
    message: 'Hi there',
    author: 'John',
    time: 1603741045962,
    roomId: 'this',
    gif: null,
  },
  {
    message: "What's up",
    author: 'Victoria',
    time: 1603741045963,
    roomId: 'room2',
    gif: null,
  },
];
