import React, { useState, useEffect, Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Box,
  Link,
  Input,
  InputLabel,
  TextField,
  Button,
} from "@material-ui/core";
import "fontsource-roboto";
import { MessageList } from "./components/MessageList";
import socketIOClient from "socket.io-client";
// const socket = socketIOClient('http://localhost:3001');
const ENDPOINT = "http://localhost:3001";

function App() {
  const [isEditingName, setIsEditingName] = useState(true);
  const [name, setName] = useState("");
  return (
    <div className="App">
      <div className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h2>Welcome to the Chat App</h2>
      </div>
      {isEditingName && (
        <Box className="App-intro">
          <InputLabel>What's your name ?</InputLabel>
          <form
            onSubmit={(e) => {
              console.log("settting");
              e.preventDefault();
              setIsEditingName(false);
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label={"John Doe"}
              id="standard-basic"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button>Submit</Button>
          </form>
        </Box>
      )}
      {!isEditingName && (
        <div>
          <h2>Greetings, {name}!</h2>
          <MessageList author={name} />
        </div>
      )}
    </div>
  );
}

export default App;
