import React, { useState, useEffect } from 'react';
import {
  Box,
  Link,
  Select,
  Container,
  TextField,
  InputLabel,
  Popover,
  Checkbox,
  ListItemText,
  MenuItem,
  Input,
  Grid,
  Paper,
  Button,
} from '@material-ui/core';
import { MOCK_ROOMS } from '../mocks';
import { SelectNames } from './SelectNames';
import sendImg from './send.png';
import plusImg from '../static/plus.png';
import socketIOClient from 'socket.io-client';
const dotenv = require('dotenv');
dotenv.config({ path: '../.env', debug: true });

const ENDPOINT = process.env.REACT_APP_API_ENDPOINT || '/';
const API_HOST = process.env.REACT_APP_API_HOST || '/';
const POST_ROOM_ENDPOINT = ENDPOINT + '/rooms';
const LOCAL_DEBUG = process.env.DEBUG || false; // TODO: remove true

const socket = socketIOClient(API_HOST);
const ERRORS = {
  'no-room-name': { text: 'Please submit a room name', id: 'no-room-name' },
  'no-members': {
    text: 'Must select at least one member',
    id: 'no-members',
  },
};
export const CreateRoomPopover = props => {
  const { setRooms, author, members } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [merrors, setErrors] = React.useState([]);
  const [isPostingRoom, setIsPostingRoom] = useState(false);
  const setForm = async arg => {
    console.log(merrors);
    console.log('isPostingRoom', isPostingRoom);
    // if there aren't errors close the modal
    if (!merrors.find(err => err !== '')) {
      console.log('closing modal');
      setAnchorEl(null);
    }
    console.log(merrors);
  };

  const handleClick = event => {
    console.log('hanlding click');
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    console.log('closing popover');
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <React.Fragment>
      <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}>
        <CreateRoomForm
          setRooms={setRooms}
          setForm={setForm}
          setIsPostingRoom={setIsPostingRoom}
          author={author}
          members={members}
          setErrors={e => {
            console.log('setting errors', merrors, e);
            setErrors(e);
          }}
          errors={merrors}
        />
      </Popover>
      <Button
        type='submit'
        form='create-room-form2'
        onClick={handleClick}
        style={{
          flex: 1,
          maxWidth: '10%',
        }}
      >
        <img src={plusImg} alt={'Send'} style={{ width: '40%' }} />
      </Button>
    </React.Fragment>
  );
};

const CreateRoomForm = props => {
  const {
    author,
    members,
    setRooms,
    setForm,
    setErrors,
    errors,
    setIsPostingRoom,
  } = props;
  const [roomName, setRoomName] = useState('');
  const [fetchError, setFetchError] = useState('');
  const [selectedNames, setSelectedNames] = useState([]);

  async function postRoom(data) {
    return fetch(POST_ROOM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(body => {
        console.log('Created room sucessfully with Name: ', data.name);
        cleanForm();
        setRooms(data);
      })
      .catch(error => {
        console.error('Error: ', error);
        if (error.name === 'TypeError') {
          return setFetchError(
            'Failed to fetch at ' +
              POST_ROOM_ENDPOINT +
              ' are you sure the server is running there? '
          );
        }
        return setFetchError(error.toString());
      })
      .finally(() => setIsPostingRoom(false));
  }
  const cleanForm = () => {
    setRoomName('');
    setErrors([]);
    setIsPostingRoom(false);
    setForm();
  };
  const appendRoom = async event => {
    event.preventDefault();
    setIsPostingRoom(true);
    //validate inputs
    if (roomName === '') {
      setErrors([...errors, 'Please submit a room name']);
      // setRoomNameError('Please submit a room name');
      return;
    }
    if (selectedNames === []) {
      setErrors([...errors, 'Must select at least one member']);
      // setNamesError('Must select at least one member');
      return;
    }
    const time = Date.now();
    const roomData = {
      ...MOCK_ROOMS[0],
      time,
      author,
      id: time.toString(),
      name: roomName,
      members: selectedNames || [],
    };
    await postRoom(roomData);
  };

  const handleInputMsgChange = event => {
    setRoomName(event.target.value);
  };

  return (
    <Grid
      container
      spacing={3}
      style={{
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        width: 'auto',
        margin: '1rem',
      }}
    >
      <Grid
        item
        style={{
          flex: 1,
        }}
      >
        Create a New Room
      </Grid>

      <Grid
        item
        component='form'
        onSubmit={appendRoom}
        noValidate
        autoComplete='off'
        id='create-room-form'
        style={{
          justifyContent: 'space-around',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TextField
          label={'New room name'}
          id='standard-basic'
          error={!!errors.length}
          helperText={errors[0]}
          value={roomName}
          onChange={handleInputMsgChange}
          style={{ flex: 1, marginBottom: '1rem' }}
        />
        <SelectNames
          names={members}
          selectedNames={selectedNames}
          setSelectedNames={setSelectedNames}
          style={{ flex: 1, marginTop: '1rem' }}
        />
      </Grid>
      <Button
        type='submit'
        form='create-room-form'
        variant='contained'
        color='primary'
        style={{
          flex: 1,
        }}
      >
        Create Room
      </Button>
    </Grid>
  );
};
