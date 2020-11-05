import './App.css';
import {
  Box,
  InputLabel,
  TextField,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Grid,
  Container,
} from '@material-ui/core';
import 'fontsource-roboto';
import { Room } from './components/Room';
import { RoomsList } from './components/RoomsList';
import React, { useState, useEffect } from 'react';
const dotenv = require('dotenv');
dotenv.config({ path: '../.env', debug: true });

const ENDPOINT = process.env.REACT_APP_API_ENDPOINT || '/';
const GET_ROOMS_ENDPOINT = ENDPOINT + '/rooms';
const POST_NAME_ENDPOINT = ENDPOINT + '/names';

const LOCAL_DEBUG = process.env.DEBUG || false; // TODO: remove true
import { MOCK_ROOMS } from './mocks';

const SignInCard = props => {
  const { setIsEditingName, name, setName } = props;
  return (
    <Box className='App-intro'>
      <AppBar className='makeStyles-appBar-2'>
        <Toolbar>
          <IconButton
            edge='start'
            className={'classes.menuButton'}
            color='inherit'
            aria-label='menu'
          ></IconButton>
          <Typography variant='h6' noWrap>
            Welcome
          </Typography>
        </Toolbar>
      </AppBar>
      <Box m={'3rem'} alignItems='center' justifyContent='center'>
        <InputLabel>What's your name ?</InputLabel>
        <form
          onSubmit={e => {
            e.preventDefault();
            setIsEditingName(false);
          }}
          noValidate
          autoComplete='off'
        >
          <TextField
            label={'My Name'}
            id='standard-basic'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Button>Submit</Button>
        </form>
      </Box>
    </Box>
  );
};
function App() {
  const [isEditingName, setIsEditingName] = useState(true);
  const [currRoomId, setcurrRoomId] = useState('home');
  const [name, setName] = useState('');

  const [rooms, setRooms] = useState(MOCK_ROOMS);
  const [currRoom, setCurrRoom] = useState(MOCK_ROOMS[0]);
  const roomsToMembs = roomsArr => {
    return !roomsArr
      ? []
      : roomsArr
          .reduce((membsArr, room) => {
            console.log(membsArr);
            console.log(room.members);
            console.log(room);
            return [...membsArr, ...room.members];
          }, [])
          .reduce(
            (membsArr, m1) =>
              membsArr.includes(m1) ? membsArr : [...membsArr, m1],
            []
          );
  };
  const [members, setMembers] = useState([]);
  const [, setError] = useState('');

  async function postName(name) {
    return fetch(POST_NAME_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
      .then(res => res.json())
      .then(body => {
        console.log('posted name', body);
      })
      .catch(error => {
        console.error('Error: ', error);
        if (error.name === 'TypeError') {
          return setError(
            'Failed to fetch at ' +
              GET_ROOMS_ENDPOINT +
              ' are you sure the server is running there? '
          );
        }
        return setError(error.toString());
      });
  }
  useEffect(() => {
    if (!isEditingName) {
      postName(name);
    }
  }, [isEditingName]);
  useEffect(() => {
    setMembers(roomsToMembs(rooms));
  }, [rooms]);
  async function fetchRooms() {
    if (LOCAL_DEBUG) {
      return setRooms(MOCK_ROOMS);
    }
    return fetch(GET_ROOMS_ENDPOINT)
      .then(res => res.json())
      .then(body => {
        setRooms(body);
      })
      .catch(error => {
        console.error('Error: ', error);
        if (error.name === 'TypeError') {
          return setError(
            'Failed to fetch at ' +
              GET_ROOMS_ENDPOINT +
              ' are you sure the server is running there? '
          );
        }
        return setError(error.toString());
      });
  }
  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    setCurrRoom(rooms.find(room => room.id == currRoomId) || MOCK_ROOMS[0]);
  }, [currRoomId, rooms]);

  return (
    <React.Fragment>
      {isEditingName && (
        <SignInCard
          setName={setName}
          setIsEditingName={setIsEditingName}
          name={name}
        />
      )}
      {!isEditingName && (
        <Grid container spacing={0}>
          <Grid item xs={3}>
            <RoomsList
              currRoomId={currRoomId}
              onRoomChange={setcurrRoomId}
              author={name}
              rooms={rooms}
              setRooms={setRooms}
              members={members}
            ></RoomsList>
          </Grid>
          <Grid item xs={9}>
            <AppBar position='static'>
              <Toolbar>
                <IconButton
                  edge='start'
                  className={'classes.menuButton'}
                  color='inherit'
                  aria-label='menu'
                ></IconButton>
                <Typography variant='h6' noWrap>
                  Hi, you're chatting as {name}
                </Typography>
              </Toolbar>
            </AppBar>
            <Box style={{ margin: '3rem' }}>
              <Room room={currRoom} author={name} />
            </Box>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}

export default App;
