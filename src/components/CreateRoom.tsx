import React, { useState } from 'react';
import { TextField, Popover, Grid, Button } from '@material-ui/core';
import { MOCK_ROOMS } from '../mocks';
import { SelectNames } from './SelectNames';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import plusImg from '../static/plus.png';

const ENDPOINT = process.env.REACT_APP_API_ENDPOINT || '/';
const POST_ROOM_ENDPOINT = ENDPOINT + '/rooms';

export const CreateRoomPopover = (props: any) => {
  const { setRooms, author, members } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [merrors, setErrors] = React.useState([]);
  const [isPostingRoom, setIsPostingRoom] = useState(false);
  const setForm = async () => {
    console.log(merrors);
    console.log('isPostingRoom', isPostingRoom);
    // if there aren't errors close the modal
    if (!merrors.find(err => err !== '')) {
      console.log('closing modal');
      setAnchorEl(null);
    }
    console.log(merrors);
  };

  const handleClick = (event: MouseEvent<HTMLAnchorElement, MouseEvent>) => {
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
          setErrors={(e: any) => {
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
          flex: '0 1 0%',
          maxWidth: '10%',
        }}
      >
        <AddRoundedIcon style={{ color: 'white' }} />
      </Button>
    </React.Fragment>
  );
};

const CreateRoomForm = (props: any) => {
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
  const [, setFetchError] = useState('');
  const [selectedNames, setSelectedNames] = useState([author]);

  async function postRoom(data: any) {
    return fetch(POST_ROOM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(() => {
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
  const appendRoom = async (event: Event) => {
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

  const handleInputMsgChange = (event: Event) => {
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
          members={members}
          author={author}
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
