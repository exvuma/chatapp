import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
  const { rooms, currRoom, onRoomChange } = props;
  const unselectedRooms = rooms.filter(room => room !== currRoom);
  console.log('rooms', rooms);
  return (
    <Drawer
      className={classes.drawer}
      variant='permanent'
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor='left'
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem selected={true} button key={currRoom}>
          <ListItemText primary={currRoom} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {unselectedRooms.map((room, index) => (
          <ListItem
            button
            key={room}
            selected={false}
            onClick={e => onRoomChange(room)}
          >
            <ListItemText primary={room} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
