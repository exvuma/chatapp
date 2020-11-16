import { assert } from 'console';
import React from 'react';
import ReactDOM from 'react-dom';
import App, { getAllMembersFromRooms } from './App';
import { MOCK_ROOMS } from './mocks';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
it('getAllMembersFromRooms', () => {
  const members = getAllMembersFromRooms(MOCK_ROOMS);
  assert(members.includes('Victoria'));
});
it('getAllMembersFromRooms empty', () => {
  const rooms = [
    { ...MOCK_ROOMS[0], members: ['Johnny', 'Patty'] },
    { ...MOCK_ROOMS[1], members: ['Fran'] },
  ];
  const members = getAllMembersFromRooms(MOCK_ROOMS);
  assert(members.includes('Fran'));
  assert(members.includes('Patty'));
  assert(members.includes('Johnny'));
});
