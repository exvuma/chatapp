import React, { useState, useEffect } from 'react';
import { Box, Link, TextField, Grid, Paper, Button } from '@material-ui/core';
import { MOCK_ROOMS } from '../mocks';
import sendImg from './send.png';
import socketIOClient from 'socket.io-client';
const dotenv = require('dotenv');
dotenv.config({ path: '../.env', debug: true });

const ENDPOINT = process.env.REACT_APP_API_ENDPOINT || '/';
const API_HOST = process.env.REACT_APP_API_HOST || '/';
const POST_ROOM_ENDPOINT = ENDPOINT + '/rooms';
const LOCAL_DEBUG = process.env.DEBUG || false; // TODO: remove true

const socket = socketIOClient(API_HOST);

export const CreateRoom = props => {
  const { onRoomsPost, author } = props;
  const [msgs, setMsgs] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  async function postRoom(data) {
    if (LOCAL_DEBUG) {
      return setMsgs(MOCK_ROOMS);
    }
    return fetch(POST_ROOM_ENDPOINT, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(body => setMsgs(body))
      .catch(error => {
        console.error('Error: ', error);
        if (error.name === 'TypeError') {
          return setError(
            'Failed to fetch at ' +
              POST_ROOM_ENDPOINT +
              ' are you sure the server is running there? '
          );
        }
        return setError(error.toString());
      });
  }

  const appendRoom = async event => {
    event.preventDefault();
    const time = Date.now();

    const roomData = {
      ...MOCK_ROOMS[0],
      time,
      author,
      id: time.toString(),
      name: inputValue,
    }; //{inputValue}
    onRoomsPost(roomData);
    const resp = await postRoom(roomData);
    // socket.emit('NewMessage', {
    //   message: inputValue,
    //   author: props.author,
    //   time,
    // });
    setInputValue('');
  };
  const handleInputMsgChange = event => {
    setInputValue(event.target.value);
  };
  return (
    <Box
      style={{
        bottom: 0,
        width: '100%',
        // position: 'absolute',
        display: 'flex',
        //   margin: '3rem',
      }}
    >
      <form
        onSubmit={appendRoom}
        noValidate
        autoComplete='off'
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        <TextField
          label={'Create New Room'}
          id='standard-basic'
          value={inputValue}
          onChange={handleInputMsgChange}
          style={{ flex: 2 }}
        />
        <Button
          style={{
            flex: 1,
          }}
        >
          <img src={sendImg} alt={'Send'} style={{ width: '40%' }} />
        </Button>
      </form>
    </Box>
  );
};
