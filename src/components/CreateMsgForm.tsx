import React, { useState } from 'react';
import {
  Select,
  InputLabel,
  Checkbox,
  ListItemText,
  MenuItem,
  Input,
} from '@material-ui/core';
import { Box, TextField, Button } from '@material-ui/core';
import GifIcon from '@material-ui/icons/Gif';
import * as sendImg from './send.png';
// import { GiphySearch } from './Giphy';
import socketIOClient from 'socket.io-client';

const ENDPOINT = process.env.REACT_APP_API_ENDPOINT || '/';
const API_HOST = process.env.REACT_APP_API_HOST || '/';
const socket = socketIOClient(API_HOST);
export const CreateMsgFormHeight = '100';
export const CreateMsgForm = props => {
  const { room, author } = props;
  const { id } = room;
  const [inputValue, setInputValue] = useState('');
  const appendMsg = event => {
    event.preventDefault();
    const time = Date.now();
    socket.emit('NewMessage', {
      message: inputValue,
      author: author,
      time,
      roomId: room.id,
    });
    setInputValue('');
  };
  const handleInputMsgChange = event => {
    setInputValue(event.target.value);
  };
  return (
    <Box
      style={{
        bottom: 0,
        position: 'fixed',
        display: 'flex',
        width: '100%',
        background: 'white',
        padding: '.2rem .2rem .2rem 2rem',
        left: '0',
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
          flex: '1',
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
            // flex: 1,
            width: ' 80px',
            padding: ' 1.6rem',
          }}
        >
          <img src={sendImg} alt={'Send'} style={{ width: '40px' }} />
        </Button>
        <GifIcon />
      </form>
    </Box>
  );
};
