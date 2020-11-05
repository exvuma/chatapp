import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { CreateRoomPopover } from './CreateRoom';
const DEFAULT_ROOM_ID = 'home';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export const Sidebar = props => {
  const { rooms, currRoomId, onRoomChange, setRooms, author, members } = props;

  const otherRooms = rooms.filter(room => room.id !== DEFAULT_ROOM_ID);
  // const currRoom = rooms.filter(room => room.id == currRoomId);
  return (
    <div
      // display='flex'
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
      }}
      // display='flex'
      // flexDirection='column'
      // justifyContent='spaceBetween'
      // flex='1'
    >
      {/* <div className={classes.toolbar} /> */}
      {!!rooms && (
        <React.Fragment>
          <List>
            <ListItem
              button
              key={DEFAULT_ROOM_ID}
              selected={currRoomId === DEFAULT_ROOM_ID}
              onClick={() => {
                console.log('aer');
                onRoomChange(DEFAULT_ROOM_ID);
              }}
            >
              <ListItemText
                primary={rooms.find(room => room.id === DEFAULT_ROOM_ID).name}
              />
            </ListItem>
          </List>
          <Divider />
          <List>
            {otherRooms.map(room => (
              <ListItem
                button
                key={room.id}
                selected={currRoomId === room.id}
                onClick={() => onRoomChange(room.id)}
              >
                <ListItemText primary={room.name} />
              </ListItem>
            ))}
          </List>
        </React.Fragment>
      )}
      <CreateRoomPopover
        setRooms={setRooms}
        author={author}
        members={members}
      />
    </div>
  );
};
