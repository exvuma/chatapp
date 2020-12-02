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
        {author}
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
