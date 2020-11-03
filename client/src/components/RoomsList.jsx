import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { Sidebar } from './Sidebar';
const dotenv = require('dotenv');
dotenv.config({ path: '../.env', debug: true });

const ENDPOINT = process.env.REACT_APP_API_ENDPOINT || '/';
const API_HOST = process.env.REACT_APP_API_HOST || '/';
const GET_ROOMS_ENDPOINT = ENDPOINT + '/rooms';
const LOCAL_DEBUG = process.env.DEBUG || false; // TODO: remove true

const MOCK_ROOMS = ['Home', 'General', 'Social', 'Incidents'];

export const RoomsList = props => {
  const { onRoomChange, currRoom } = props;
  //   const classes = useStyles();
  // const [currRoom, setCurrRoom] = React.useState("Home");
  const [rooms, setRooms] = React.useState(['Home']);
  const [] = useState('');
  const [error, setError] = useState('');
  async function fetchRooms() {
    if (LOCAL_DEBUG) {
      return setRooms(MOCK_ROOMS);
    }
    return fetch(GET_ROOMS_ENDPOINT)
      .then(res => res.json())
      .then(body => setRooms(body))
      .catch(error => {
        console.error('Error: ', error);
        if (error.name === 'TypeError') {
          return setError(
            'Failed to fetch at ' +
              GET_ROOMS_ENDPOINT +
              ' are you sure the server is running there? '
          );
        }
        return setError(error.toString());
      });
  }
  useEffect(() => {
    fetchRooms();
  }, []);
  return (
    <Sidebar
      rooms={rooms}
      currRoom={currRoom}
      onRoomChange={onRoomChange}
    ></Sidebar>
  );
};
