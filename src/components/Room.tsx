import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Card,
  Box,
  Link,
  TextField,
  Typography,
  Button,
} from '@material-ui/core';
import sendImg from './send.png';
import socketIOClient from 'socket.io-client';
import { MOCK_MSGS } from '../mocks';
import { CreateMsgForm } from './CreateMsgForm';
import { SelectNames } from './SelectNames';
import { MsgType, RoomType } from '../types';
import { Gif } from '@giphy/react-components';

const API_HOST = process.env.REACT_APP_API_HOST || '/';
const ENDPOINT = process.env.REACT_APP_API_ENDPOINT || '/api';
const GET_MSGS_ENDPOINT = (roomId: string) =>
  ENDPOINT + '/rooms/' + roomId + '/messages';
const LOCAL_DEBUG = process.env.DEBUG || false; // TODO: remove true
const socket = socketIOClient(API_HOST);

export const Room = (props: any) => {
  const { room, author } = props;
  const { id, members } = room;
  const roomAuthor = room.author;
  const roomId = id;
  const [msgs, setMsgs] = useState<MsgType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const buttomMsgRef = useRef(null);
  const roomMsgs = msgs.filter((msg: MsgType) => msg.roomId === id);
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

    socket.on('MsgCreated', (data: any) => {
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
  useEffect(() => {
    scrollToBottom();
  }, [roomMsgs]);

  const scrollToBottom = () => {
    console.log(buttomMsgRef);
    if (buttomMsgRef.current !== null) {
      buttomMsgRef.current.scrollIntoView(false);
    }
  };
  return (
    <Box
      marginTop={3}
      style={{
        background: '#f5f5f5',
        overflowY: 'auto',
        height: '100%',
      }}
    >
      {!!error.length && <Box>There were errors {error}</Box>}
      Members is this room:{' '}
      {members.map((mem: RoomType['members']) => (
        <Link key={mem}> {mem} </Link>
      ))}
      <Box>
        {roomMsgs.map((msg, i) => {
          // To use ref must not be functional component,so use div
          return i !== roomMsgs.length - 1 ? (
            <Message msg={msg} />
          ) : (
            <div ref={buttomMsgRef} id={i + '-blah'}>
              <Message msg={msg} />
            </div>
          );
        })}
      </Box>
    </Box>
  );
};
type MessageProps = {
  msg: MsgType;
};
const Message = (props: MessageProps) => {
  const { msg } = props;
  const { author, message, time, gif } = msg;
  const prettyTime = new Date(time).toUTCString().replace('GMT', '');
  return (
    <Card
      style={{
        margin: '1em',
        padding: '1em',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        style={{ alignSelf: 'flex-end' }}
        color='textSecondary'
        gutterBottom
      >
        {prettyTime}
      </Typography>
      <Box display='flex' p={1} key={time} marginTop={3}>
        <Box textAlign='left' alignSelf='flex-start' flexGrow={1}>
          {message}
          {gif ? <Gif gif={gif} width={300} /> : ''}
        </Box>
        <Link style={{ float: 'right' }}> {author}</Link>
      </Box>
    </Card>
  );
};
