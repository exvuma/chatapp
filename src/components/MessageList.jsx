import React, { useState, useEffect } from "react";
import { Box, Link, TextField, Grid, Paper, Button } from "@material-ui/core";
import sendImg from "./send.png";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3001";
const GET_MSGS_ENDPOINT = ENDPOINT + "/api/messages";
const LOCAL_DEBUG = process.env === "local" || true; // TODO: remove true
const MOCK_MSGS = [
  { message: "Hi there", author: "John", time: 1603741045962 },
  { message: "What's up", author: "Victoria", time: 1603741045962 },
];
const socket = socketIOClient(ENDPOINT);

export const MessageList = (props) => {
  const [msgs, setMsgs] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [errors, setErrors] = useState([]);
  async function fetchMsgs() {
    if (LOCAL_DEBUG) {
      return setMsgs(MOCK_MSGS);
    }
    return fetch(GET_MSGS_ENDPOINT)
      .then((res) => res.json())
      .then((body) => setMsgs(body))
      .catch((error) => {
        console.log("Error: ", error);
        return setErrors([...errors, error.toString()]);
      });
  }

  useEffect(() => {
    socket.on("connection", () => {
      console.log(`I'm connected with the back-end`);
    });

    socket.on("MsgReceived", (data) => {
      console.log("MsgReceived on client", data);
      setMsgs([...msgs, ...JSON.parse(data)]);
    });
    // CLEAN UP THE EFFECT
    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    fetchMsgs();
  }, []);

  const appendMsg = (event) => {
    event.preventDefault();

    const time = Date.now();
    socket.emit("NewMessage", {
      message: inputValue,
      author: props.author,
      time,
    });
    setInputValue("");
  };
  const handleInputMsgChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <div>
      <Grid container className={"classes.root"} spacing={2}>
        {msgs.map((msg) => (
          <Box item key={msg.time} item>
            <Paper className={"asd"} />
          </Box>
        ))}
      </Grid>

      {!!errors.length && <Box>There were errors {JSON.stringify(errors)}</Box>}
      {msgs.map((msg) => (
        <Box display="flex" p={1} key={msg.time}>
          <Box textAlign="left" alignSelf="flex-start" flexGrow={1}>
            {msg.message}
          </Box>
          <Link>{msg.author}</Link>
        </Box>
      ))}
      <Box
        style={{
          bottom: 0,
          width: "100%",
          position: "fixed",
          display: "flex",
          margin: "2rem",
        }}
      >
        <form
          onSubmit={appendMsg}
          noValidate
          autoComplete="off"
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <TextField
            label={"Message here"}
            id="standard-basic"
            value={inputValue}
            onChange={handleInputMsgChange}
            style={{ flex: 2 }}
          />
          <Button
            style={{
              flex: 1,
            }}
          >
            <img src={sendImg} alt={"Send"} style={{ width: "5%" }} />
          </Button>
        </form>
      </Box>
    </div>
  );
};
