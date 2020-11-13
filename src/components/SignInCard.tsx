import {
  Box,
  InputLabel,
  TextField,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';
import 'fontsource-roboto';
import React from 'react';

const ENDPOINT = process.env.REACT_APP_API_ENDPOINT || '/';
type SignInCardProps = {
  setIsEditingName: (arg: boolean) => any;
  name: string;
  setName: (arg: string) => any;
  fetchRooms: () => Promise<void>;
};

export const SignInCard = (props: SignInCardProps) => {
  const { setIsEditingName, name, setName, fetchRooms } = props;
  return (
    <Box
      className='App-intro'
      style={{
        margin: '3rem',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Toolbar>
        <Typography variant='h6' noWrap>
          Welcome to Chat App
        </Typography>
      </Toolbar>
      <Box
        style={{
          flex: 1,
          margin: '3rem',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <InputLabel>What's your name ?</InputLabel>
        <form
          onSubmit={e => {
            e.preventDefault();
            setIsEditingName(false);
            fetchRooms();
          }}
          style={{
            flex: 1,
          }}
          noValidate
          autoComplete='off'
        >
          <TextField
            style={{
              flex: 1,
            }}
            label={'My Name'}
            id='standard-basic'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Button
            color='primary'
            style={{
              flex: 1,
              margin: '1rem',
            }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};
