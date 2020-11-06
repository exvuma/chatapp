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
} from '@material-ui/core';
import 'fontsource-roboto';
import { Room } from './components/Room';
import { Sidebar } from './components/Sidebar';
import React, { useState, useEffect } from 'react';

const ENDPOINT = process.env.REACT_APP_API_ENDPOINT || '/';
const GET_ROOMS_ENDPOINT = ENDPOINT + '/rooms';
const POST_NAME_ENDPOINT = ENDPOINT + '/names';

const LOCAL_DEBUG = process.env.DEBUG || false; // TODO: remove true
import { MOCK_ROOMS } from './mocks';

const SignInCard = props => {
  const { setIsEditingName, name, setName, fetchRooms } = props;
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
            fetchRooms();
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
  const [members, setMembers] = useState([]);
  const [, setError] = useState('');

  const [rooms, setRooms] = useState(MOCK_ROOMS);
  const [currRoom, setCurrRoom] = useState(MOCK_ROOMS[0]);
  // get all the members from the rooms and remove duplicates
  const roomsToMembs = roomsArr => {
    return !roomsArr
      ? []
      : roomsArr
          .reduce((membsArr, room) => {
            return room.members ? [...membsArr, ...room.members] : membsArr;
          }, [])
          .reduce(
            (membsArr, m1) =>
              membsArr.includes(m1) ? membsArr : [...membsArr, m1],
            []
          );
  };

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
  useEffect(async () => {
    if (!isEditingName) {
      await postName(name);
      await fetchRooms();
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
    setCurrRoom(rooms.find(room => room.id == currRoomId) || MOCK_ROOMS[0]);
  }, [currRoomId, rooms]);

  return (
    <React.Fragment>
      {isEditingName && (
        <SignInCard
          setName={setName}
          setIsEditingName={setIsEditingName}
          fetchRooms={fetchRooms}
          name={name}
        />
      )}
      {!isEditingName && (
        <Grid container spacing={0}>
          <Grid item xs={3}>
            <Sidebar
              rooms={rooms}
              author={name}
              currRoomId={currRoomId}
              onRoomChange={setcurrRoomId}
              members={members}
              setRooms={room => {
                setRooms([...rooms, room]);
              }}
            ></Sidebar>
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
