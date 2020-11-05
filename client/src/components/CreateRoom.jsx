import React, { useState, useEffect } from 'react';
import {
  Box,
  Link,
  Select,
  TextField,
  InputLabel,
  Checkbox,
  ListItemText,
  MenuItem,
  Input,
  Grid,
  Paper,
  Button,
} from '@material-ui/core';
import { MOCK_ROOMS } from '../mocks';
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

export const SelectNames = props => {
  const { names, selectedNames, setSelectedNames } = props;
  const [personName, setPersonName] = React.useState([]);

  const handleChange = event => {
    setPersonName(event.target.value);
    console.log(event.target.value);
    setSelectedNames(event.target.value);
  };

  const handleChangeMultiple = event => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
  };

  return (
    <React.Fragment>
      <InputLabel id='demo-mutiple-checkbox-label'>Select Members</InputLabel>
      <Select
        labelId='demo-mutiple-checkbox-label'
        id='demo-mutiple-checkbox'
        multiple
        value={personName}
        onChange={handleChange}
        input={<Input />}
        renderValue={selected => selected.join(', ')}
        // MenuProps={MenuProps}
      >
        {names.map(name => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={personName.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </React.Fragment>
  );
};
export const CreateRoom = props => {
  const { onRoomsPost, author, members } = props;
  const [msgs, setMsgs] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [selectedNames, setSelectedNames] = React.useState([]);
  const [openNameSelect, setOpenNameSelect] = useState(false);

  async function postRoom(data) {
    if (LOCAL_DEBUG) {
      return setMsgs(MOCK_ROOMS);
    }
    return fetch(POST_ROOM_ENDPOINT, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(body => {
        setMsgs(body);
        console.log('Created room sucessfully with Name: ', data.name);
      })
      .catch(error => {
        console.error('Error: ', error);
        if (error.name === 'TypeError') {
          return setError(
            'Failed to fetch at ' +
              POST_ROOM_ENDPOINT +
              ' are you sure the server is running there? '
          );
        }
        return setError(error.toString());
      });
  }

  const appendRoom = async event => {
    event.preventDefault();
    const time = Date.now();
    const roomData = {
      ...MOCK_ROOMS[0],
      time,
      author,
      id: time.toString(),
      name: inputValue,
      members: selectedNames,
    }; //{inputValue}
    onRoomsPost(roomData);
    const resp = await postRoom(roomData);
    setInputValue('');
    setOpenNameSelect(false);
  };
  const handleInputMsgChange = event => {
    setInputValue(event.target.value);
    setOpenNameSelect(true);
  };
  return (
    <form
      onSubmit={appendRoom}
      noValidate
      autoComplete='off'
      id='create-room-form'
      style={{
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <TextField
          label={'Create New Room'}
          id='standard-basic'
          value={inputValue}
          onChange={handleInputMsgChange}
          style={{ flex: 2 }}
        />
        <Button
          type='submit'
          form='create-room-form'
          style={{
            flex: 1,
          }}
        >
          <img src={plusImg} alt={'Send'} style={{ width: '40%' }} />
        </Button>
      </div>
      {openNameSelect && (
        <SelectNames
          names={members}
          selectedNames={selectedNames}
          setSelectedNames={setSelectedNames}
        />
      )}
    </form>
  );
};
