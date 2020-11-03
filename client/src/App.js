import React, { useState } from 'react';
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
  Drawer,
} from '@material-ui/core';
import 'fontsource-roboto';
import { MessageList } from './components/MessageList';
import { Room } from './components/Room';
import { RoomsList } from './components/RoomsList';

const SignInCard = props => {
  const { setIsEditingName, name, setName } = props;
  return (
    <Box className='App-intro'>
      <AppBar position='' className='makeStyles-appBar-2'>
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
  const [isEditingName, setIsEditingName] = useState(false);
  const [currRoom, setCurrRoom] = useState('home');
  const [name, setName] = useState('Name');
  const onRoomChange = event => {
    console.log(event.target);
    setCurrRoom(event.target.value);
  };
  return (
    <div>
      {isEditingName && (
        <SignInCard
          setName={setName}
          setIsEditingName={setIsEditingName}
          name={name}
        />
      )}
      {!isEditingName && (
        <div>
          <Container>
            <AppBar position='' className='makeStyles-appBar-2'>
              <Toolbar>
                <IconButton
                  edge='start'
                  className={'classes.menuButton'}
                  color='inherit'
                  aria-label='menu'
                ></IconButton>
                <Typography variant='h6' noWrap>
                  {!isEditingName && `Hi, you're chatting as ${name}`}
                </Typography>
              </Toolbar>
            </AppBar>
          </Container>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <RoomsList
                currRoom={currRoom}
                onRoomChange={setCurrRoom}
              ></RoomsList>
            </Grid>
            <Grid item xs={9}>
              {/* <Typography paragraph>Lorem ipsum dolor sit amet</Typography> */}
              <Box style={{ margin: '3rem' }}>
                {!isEditingName && <Room roomId={currRoom} author={name} />}
              </Box>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}

export default App;
