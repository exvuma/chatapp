import React, { useState } from "react";
import "./App.css";
import {
  Box,
  InputLabel,
  TextField,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import "fontsource-roboto";
import { MessageList } from "./components/MessageList";
import { RoomsList } from "./components/RoomsList";

function App() {
  const [isEditingName, setIsEditingName] = useState(true);
  const [name, setName] = useState("");
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={"classes.menuButton"}
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Typography variant="h6" className={"classes.title"}>
            {!isEditingName && (
              <div>
                <h2>You're chatting as {name}</h2>
              </div>
            )}
          </Typography>
        </Toolbar>
      </AppBar>
      {/* <RoomsList /> */}
      <RoomsList />
      <Box style={{ margin: "3rem" }}>
        {!isEditingName && <MessageList author={name} />}
        {isEditingName && (
          <Box className="App-intro">
            <InputLabel>What's your name ?</InputLabel>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsEditingName(false);
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                label={"My Name"}
                id="standard-basic"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button>Submit</Button>
            </form>
          </Box>
        )}
      </Box>
    </div>
  );
}

export default App;
