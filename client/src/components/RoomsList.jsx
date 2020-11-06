import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { CreateRoomPopover } from './CreateRoom';
import { Sidebar } from './Sidebar';

const ENDPOINT = process.env.REACT_APP_API_ENDPOINT || '/';
const API_HOST = process.env.REACT_APP_API_HOST || '/';
const GET_ROOMS_ENDPOINT = ENDPOINT + '/rooms';
const LOCAL_DEBUG = process.env.DEBUG || false; // TODO: remove true
import { MOCK_ROOMS } from '../mocks';
// const MOCK_ROOMS = ['Home', 'General', 'Social', 'Incidents'];

export const RoomsList = props => {
  const { onRoomChange, currRoomId, author, rooms, setRooms, members } = props;
  //   const classes = useStyles();
  // const [currRoomId, setcurrRoomId] = React.useState("Home");

  // TODO: watch for onRoomCreated socket
  // useEffect(() => {
  //   socket.on('connection', () => {
  //     console.log(`I'm connected with the back-end`);
  //   });

  //   socket.on('RoomCreated', data => {
  //     console.log('RoomCreated on client', data);
  //     setMsgs([...msgs, ...JSON.parse(data)]);
  //   });
  //   // CLEAN UP THE EFFECT
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);
  return (
    <Sidebar
      rooms={rooms}
      currRoomId={currRoomId}
      onRoomChange={onRoomChange}
      author={author}
      members={members}
      setRooms={room => {
        setRooms([...rooms, room]);
      }}
    ></Sidebar>
  );
};
