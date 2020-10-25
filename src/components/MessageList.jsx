import React, { useState, useEffect } from "react";
import {
  Box,
  Link,
  Input,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";

// const messages = [
//     { author: "Victoria", message: "some mssg" },
//     { author: "2", message: "some message" }
// ];
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3001";
const GET_MSGS_ENDPOINT = ENDPOINT + "/api/messages";
const socket = socketIOClient(ENDPOINT);

export const MessageList = (props) => {
  const [msgs, setMsgs] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [errors, setErrors] = useState([]);
  // async function fetchMsgs() {
  //   const res = await fetch(GET_MSGS_ENDPOINT);
  //   console.log("fetching");
  //   return res
  //     .json()
  //     .then((res) => setMsgs(res))
  //     .catch((error) => setErrors([errors, error]));
  // }

  useEffect(async () => {
    console.log("using sockets");
    socket.on("connection", () => {
      console.log(`I'm connected with the back-end`);
    });
    socket.on("NewUser", () => {
      console.log(`New User`);
    });
    socket.on("FromAPI", (data) => {
      console.log("from api", data);
      setMsgs([...msgs, ...JSON.parse(data)]);
    });
    socket.on("MsgReceived", (data) => {
      console.log("MsgReceived on client", data);
      setMsgs([...msgs, ...JSON.parse(data)]);
    });
    socket.on("NewMessage", (data) => {
      console.log("some new message recieved");
    });
    // CLEAN UP THE EFFECT

    return () => {
      socket.disconnect();
      // await fetchMsgs()
    };
  }, []);
  // useEffect(async () => {
  //   const resp = await fetchMsgs();
  //   console.log("done fetching", resp);
  // });

  const appendMsg = (event) => {
    event.preventDefault();
    console.log("appending", inputValue, props.author);

    const time = Date.now();
    socket.emit("NewMessage", {
      message: inputValue,
      author: props.author,
      time,
    });
    console.log("sent NewMessage");
    // setMsgs([...msgs, { message: inputValue, author: "me" }]);
  };
  const handleInputMsgChange = (event) => {
    console.log("asd");
    setInputValue(event.target.value);
  };
  return (
    <div>
      {!errors && <Box>There were errors {JSON.stringify(errors)}</Box>}
      {msgs.map((msg) => (
        <Box display="flex" p={1} key={msg.time}>
          <Box textAlign="left" alignSelf="flex-start" flexGrow={1}>
            {msg.message}
          </Box>
          <Link>{msg.author}</Link>
        </Box>
      ))}
      <form onSubmit={appendMsg} noValidate autoComplete="off">
        <TextField
          label={"Message here"}
          id="standard-basic"
          value={inputValue}
          onChange={handleInputMsgChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};
