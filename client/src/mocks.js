export const MOCK_ROOMS = [
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
    time: 1603741045962,
    members: ['Victoria', 'John'],
  },
];
export const MOCK_MSGS = [
  { message: 'Hi there', author: 'John', time: 1603741045962, roomId: 'this' },
  {
    message: "What's up",
    author: 'Victoria',
    time: 1603741045962,
    roomId: 'room2',
  },
];
