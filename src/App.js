import React, { useReducer, useEffect } from "react";
import JoinBlock from "./components/joinBlock";
import reducer from "./reducer";
import Chat from "./components/Chat";
import socket from "./socket";

function App() {
  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  });
  useEffect(() => {
    socket.on("updateInfo", function (obj) {
      console.log("updateInfo:", obj);
      dispatch({ type: "SET_ROOMID", payload: obj.roomId });
      dispatch({ type: "SET_MESSAGES", payload: obj.messages });
      dispatch({ type: "SET_USERS", payload: obj.users });
    });
  }, [state]);
  useEffect(() => {
    return () => {
      console.log("unmount");
      socket.disconnect();
    };
  }, []);

  function onLogin(userName) {
    dispatch({ type: "LOGIN" });
    dispatch({ type: "SET_USERNAME", payload: userName });
  }

  return (
    <div className="app">
      {!state.joined ? <JoinBlock onLogin={onLogin} /> : <Chat state={state} />}
    </div>
  );
}

export default App;
