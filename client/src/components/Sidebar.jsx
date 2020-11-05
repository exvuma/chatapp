import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { Box } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { CreateRoom } from './CreateRoom';
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
  const classes = useStyles();
  const {
    rooms,
    currRoomId,
    onRoomChange,
    onRoomsPost,
    author,
    members,
  } = props;

  const unselectedRooms = rooms.filter(room => room.id !== currRoomId);
  const otherRooms = rooms.filter(room => room.id !== DEFAULT_ROOM_ID);
  // const currRoom = rooms.filter(room => room.id == currRoomId);
  const isSelected = currRoom => rooms.find(room => currRoom.id === room.id);
  console.log('rooms', rooms);
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
              selected={currRoomId === DEFAULT_ROOM_ID}
              button
              key={DEFAULT_ROOM_ID}
            >
              <ListItemText
                primary={rooms.find(room => room.id === DEFAULT_ROOM_ID).name}
              />
            </ListItem>
          </List>
          <Divider />
          <List>
            {otherRooms.map((room, index) => (
              <ListItem
                button
                key={room.id}
                selected={currRoomId === room.id}
                onClick={e => onRoomChange(room.id)}
              >
                <ListItemText primary={room.name} />
              </ListItem>
            ))}
          </List>
        </React.Fragment>
      )}
      <CreateRoom onRoomsPost={onRoomsPost} author={author} members={members} />
    </div>
  );
};
