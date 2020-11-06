import React, { useState, useEffect } from 'react';
import { Box, Link, TextField, Button } from '@material-ui/core';
import sendImg from './send.png';
import socketIOClient from 'socket.io-client';
import { MOCK_MSGS } from '../mocks';

const ENDPOINT = process.env.REACT_APP_API_ENDPOINT || '/';
const API_HOST = process.env.REACT_APP_API_HOST || '/';
const GET_MSGS_ENDPOINT = roomId => ENDPOINT + '/rooms/' + roomId + '/messages';
const LOCAL_DEBUG = process.env.DEBUG || false; // TODO: remove true
const socket = socketIOClient(API_HOST);

export const Room = props => {
  const { room } = props;
  const { id, author, members } = room;
  const roomId = id;
  const [msgs, setMsgs] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const roomMsgs = msgs.filter(msg => msg.roomId === id);
  async function fetchMsgs() {
    if (LOCAL_DEBUG) {
      return setMsgs(MOCK_MSGS);
    }
    return fetch(GET_MSGS_ENDPOINT(roomId))
      .then(res => res.json())
      .then(body => setMsgs(body))
      .catch(error => {
        console.error('Error: ', error);
        if (error.name === 'TypeError') {
          return setError(
            'Failed to fetch at ' +
              GET_MSGS_ENDPOINT(roomId) +
              ' are you sure the server is running there? '
          );
        }
        return setError(error.toString());
      });
  }

  useEffect(() => {
    socket.on('connection', () => {
      console.log(`I'm connected with the back-end`);
    });

    socket.on('MsgCreated', data => {
      console.log('MsgCreated on client', data);
      setMsgs([...msgs, ...JSON.parse(data)]);
    });
    // CLEAN UP THE EFFECT
    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    fetchMsgs();
  }, [roomId]);

  const appendMsg = event => {
    event.preventDefault();
    const time = Date.now();
    socket.emit('NewMessage', {
      message: inputValue,
      author: author,
      time,
      roomId: id,
    });
    setInputValue('');
  };
  const handleInputMsgChange = event => {
    setInputValue(event.target.value);
  };
  return (
    <Box marginTop={3}>
      {!!error.length && <Box>There were errors {error}</Box>}
      Members is this room:{' '}
      {members.map(mem => (
        <Link key={mem}> {mem} </Link>
      ))}
      {roomMsgs.map(msg => (
        <Box display='flex' p={1} key={msg.time} marginTop={3}>
          <Box textAlign='left' alignSelf='flex-start' flexGrow={1}>
            {msg.message}
          </Box>
          <Link> {msg.author}</Link>
        </Box>
      ))}
      <Box
        style={{
          bottom: 0,
          width: '80%',
          position: 'fixed',
          display: 'flex',
          margin: '2rem',
        }}
      >
        <form
          onSubmit={appendMsg}
          noValidate
          autoComplete='off'
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            marginRight: '3rem',
          }}
        >
          <TextField
            label={'Message here'}
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
            <img src={sendImg} alt={'Send'} style={{ width: '15%' }} />
          </Button>
        </form>
      </Box>
    </Box>
  );
};
