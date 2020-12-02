import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import { Gif, GifOverlayProps } from '@giphy/react-components';
import SendIcon from '@material-ui/icons/Send';
import { CreateGiphyPopover } from './Giphy';
import socketIOClient from 'socket.io-client';
import { RoomType, IGif } from '../types';

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
  const [inputGif, setInputGif] = useState<IGif | null>(null);

  useEffect(() => {
    if (inputGif) {
      setInputValue(inputValue);
    }
  }, [inputGif]);

  const appendMsg = (event: FormEvent<HTMLFormElement>) => {
    console.log('appendmsf');
    event.preventDefault();
    const time = Date.now();
    socket.emit('NewMessage', {
      message: inputValue,
      gif: inputGif,
      author: author,
      time,
      roomId: room.id,
    });
    setInputValue('');
    setInputGif(null);
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
        padding: '1rem 1rem 1rem 2rem',
        left: '0',
        height: `${CreateMsgFormHeight}px`,
        boxSizing: 'border-box',
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
          minHeight: '0',
        }}
      >
        <TextField
          label={'Message here'}
          type={'string'}
          id='standard-basic'
          value={inputValue}
          onChange={handleInputMsgChange}
          style={{ flex: 2 }}
        />
        {inputGif ? (
          <Gif gif={inputGif} width={300} height={CreateMsgFormHeight} />
        ) : (
          ''
        )}
        <Button
          style={{
            padding: ' 1.6rem',
          }}
          onClick={appendMsg}
        >
          <SendIcon style={{ width: '40px' }} />
        </Button>
      </form>
      <CreateGiphyPopover setInputGif={setInputGif} />
    </Box>
  );
};
