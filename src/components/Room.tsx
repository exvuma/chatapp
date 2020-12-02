import React, { useState, useEffect, useRef } from 'react';
import { Box, Link } from '@material-ui/core';
import socketIOClient from 'socket.io-client';
import { MOCK_MSGS } from '../mocks';
import { MsgType, RoomType } from '../types';
import { Message } from './Message';

const API_HOST = process.env.REACT_APP_API_HOST || '/';
const ENDPOINT = process.env.REACT_APP_API_ENDPOINT || '/api';
const GET_MSGS_ENDPOINT = (roomId: string) =>
  ENDPOINT + '/rooms/' + roomId + '/messages';
const LOCAL_DEBUG = process.env.DEBUG || false; // TODO: remove true
const socket = socketIOClient(API_HOST);

export const Room = (props: any) => {
  const { room } = props;
  const { id, members } = room;
  const roomId = id;
  const [msgs, setMsgs] = useState<MsgType[]>([]);
  const [] = useState('');
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
      {members.map((mem: RoomType['members'][0]) => (
        <Link key={mem}> {mem} </Link>
      ))}
      <Box>
        {roomMsgs.map((msg, i) => {
          // To use ref must not be functional component,so use div
          return i !== roomMsgs.length - 1 ? (
            <Message msg={msg} />
          ) : (
            <div ref={buttomMsgRef} id={i + '-msg'}>
              <Message msg={msg} />
            </div>
          );
        })}
      </Box>
    </Box>
  );
};
