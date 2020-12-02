import React from 'react';
import { Card, Box, Link, Typography } from '@material-ui/core';
import { MsgType } from '../types';
import { Gif } from '@giphy/react-components';

type MessageProps = {
  msg: MsgType;
};
export const Message = (props: MessageProps) => {
  const { msg } = props;
  const { author, message, time, gif } = msg;
  const prettyTime = new Date(time).toUTCString().replace('GMT', '');
  return (
    <>
      <Box
        style={{
          margin: '1em 1em 0 1em',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography gutterBottom variant='subtitle2'>
          {author}
        </Typography>
        <Typography color='textSecondary' variant='subtitle2' gutterBottom>
          {prettyTime}
        </Typography>
      </Box>
      <Card
        style={{
          margin: '0em 1em 1em 1em',
          padding: '1em',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box textAlign='left' alignSelf='flex-start' flexGrow={1}>
          {message}
          {gif ? <Gif gif={gif} width={300} /> : ''}
        </Box>
      </Card>
    </>
  );
};
