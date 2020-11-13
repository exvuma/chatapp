import React, { ChangeEvent, useState } from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import { Gif } from '@giphy/react-components';
import SendIcon from '@material-ui/icons/Send';
import { CreateGiphyPopover } from './Giphy';
import socketIOClient from 'socket.io-client';
import { RoomType } from '../types';

const API_HOST = process.env.REACT_APP_API_HOST || '/';
const socket = socketIOClient(API_HOST);
export const CreateMsgFormHeight = '100';

type CreateMsgFormProps = {
  room: RoomType;
  author: string;
};
export const CreateMsgForm: React.FC<CreateMsgFormProps> = props => {
  const { room, author } = props;
  const [inputValue, setInputValue] = useState('');
  const [inputGif, setInputGif] = useState<IGif>(null);
  const appendMsg = (event: FormEvent<HTMLFormElement>) => {
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
  const handleInputMsgChange = (event: ChangeEvent) => {
    setInputValue(event.target.value);
  };
  return (
    <Box
      style={{
        bottom: 0,
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
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
        {inputGif ? <Gif gif={inputGif} width={300} /> : ''}
        <Button
          style={{
            width: ' 80px',
            padding: ' 1.6rem',
          }}
        >
          <SendIcon style={{ width: '40px' }} />
        </Button>
      </form>
      <CreateGiphyPopover setInputGif={setInputGif} />
    </Box>
  );
};
