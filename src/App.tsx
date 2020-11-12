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
// } from '@material-ui/core';
import 'fontsource-roboto';
import { Room } from './components/Room';
import { SignInCard } from './components/SignInCard';
import { Sidebar } from './components/Sidebar';
import { CreateMsgForm, CreateMsgFormHeight } from './components/CreateMsgForm';

import React, { useState, useEffect } from 'react';

const ENDPOINT = process.env.REACT_APP_API_ENDPOINT || '/';
const GET_ROOMS_ENDPOINT = ENDPOINT + '/rooms';
const POST_NAME_ENDPOINT = ENDPOINT + '/names';

const LOCAL_DEBUG = process.env.DEBUG || true; // TODO: remove true
import { MOCK_ROOMS } from './mocks';

function App() {
  const [isEditingName, setIsEditingName] = useState(
    LOCAL_DEBUG ? false : true
  );
  const [currRoomId, setcurrRoomId] = useState('home');
  const [name, setName] = useState(LOCAL_DEBUG ? 'Victoria' : '');
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

  const postName = async name => {
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
  };
  useEffect(async () => {
    if (!isEditingName) {
      await postName(name);
      await fetchRooms();
      // otherwise defaults to home author set in mock
      setCurrRoom({ ...currRoom, author: name });
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
    setCurrRoom(rooms.find(room => room.id == currRoomId));
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
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Grid
            container
            spacing={0}
            style={{
              flex: 1,
            }}
          >
            <Grid
              item
              xs={3}
              style={{
                overflowY: 'scroll',
                height: `calc(100vh - ${CreateMsgFormHeight}px)`,
              }}
            >
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
            <Grid
              item
              xs={9}
              style={{
                background: '#f5f5f5',
                overflow: 'scroll',
                height: `calc(100vh - ${CreateMsgFormHeight}px)`,
              }}
            >
              <AppBar position='static' style={{ boxShadow: 'none' }}>
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
              <Box style={{ margin: '3rem', background: '#f5f5f5' }}>
                <Room room={currRoom} author={name} />
              </Box>
            </Grid>
          </Grid>
          <div style={{ height: `${CreateMsgFormHeight}px` }}>
            <CreateMsgForm room={currRoom} author={name} />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default App;
