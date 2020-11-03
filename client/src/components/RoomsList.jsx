import React, { useState, useEffect } from "react";
import {
  Drawer,
  Button,
  List,
  ListItem,
  Collapse,
  Divider,
  ListItemText,
} from "@material-ui/core";
import ResponsiveDrawer from "./ResponsiveDrawer";
import sendImg from "./send.png";
import socketIOClient from "socket.io-client";
const dotenv = require("dotenv");
dotenv.config({ path: "../.env", debug: true });

const ENDPOINT = process.env.REACT_APP_API_ENDPOINT || "/";
const API_HOST = process.env.REACT_APP_API_HOST || "/";
const GET_ROOMS_ENDPOINT = ENDPOINT + "/rooms";
const LOCAL_DEBUG = process.env.DEBUG || false; // TODO: remove true

const socket = socketIOClient(API_HOST);
const MOCK_ROOMS = ["Home", "General", "Social", "Incidents"];

export const RoomsList = (props) => {
  const { onRoomChange, currRoom } = props;
  //   const classes = useStyles();
  // const [currRoom, setCurrRoom] = React.useState("Home");
  const [rooms, setRooms] = React.useState(["Home"]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  async function fetchRooms() {
    if (LOCAL_DEBUG) {
      return setRooms(MOCK_ROOMS);
    }
    return fetch(GET_ROOMS_ENDPOINT)
      .then((res) => res.json())
      .then((body) => setRooms(body))
      .catch((error) => {
        console.error("Error: ", error);
        if (error.name === "TypeError") {
          return setError(
            "Failed to fetch at " +
              GET_ROOMS_ENDPOINT +
              " are you sure the server is running there? "
          );
        }
        return setError(error.toString());
      });
  }
  useEffect(() => {
    fetchRooms();
  }, []);
  return (
    <div>
      <ResponsiveDrawer
        rooms={rooms}
        currRoom={currRoom}
        onRoomChange={onRoomChange}
      ></ResponsiveDrawer>
    </div>
  );
};
