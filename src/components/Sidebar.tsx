import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { CreateRoomPopover } from './CreateRoom';
import { RoomType } from '../types';
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

export const Sidebar = (props: any) => {
  const { rooms, currRoomId, onRoomChange, setRooms, author, members } = props;

  const otherRooms = rooms.filter(
    (room: any) => room.id !== DEFAULT_ROOM_ID && room.members.includes(author)
  );
  return (
    <div>
      <List>
        <ListItem
          button
          key={DEFAULT_ROOM_ID}
          selected={currRoomId === DEFAULT_ROOM_ID}
          onClick={() => {
            onRoomChange(DEFAULT_ROOM_ID);
          }}
        >
          <ListItemText
            primary={
              rooms.find((room: RoomType) => room.id === DEFAULT_ROOM_ID).name
            }
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        {otherRooms.map((room: RoomType) => (
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
      <CreateRoomPopover
        setRooms={setRooms}
        author={author}
        members={members}
      />
    </div>
  );
};
