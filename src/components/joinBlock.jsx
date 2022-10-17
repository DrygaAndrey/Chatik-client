import React, { useState, useEffect } from "react";
import socket from "../socket";
import "./styles/joinBlock.sass";
function JoinBlock({ onLogin }) {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rooms, setRooms] = useState({});

  const onEnter = () => {
    setIsLoading(true);
    if (!roomId || !userName) {
      setIsLoading(false);
      return alert("RoomId and nickname should not be empty");
    }

    
    const room = rooms.find((room)=>room.roomId===roomId)
    if(room){
      const user = room.users.find((user)=>user.name===userName);
      if(user){
        
        alert("There are already user with this nickname in this room");
        return setIsLoading(false);
      }
    }
    socket.emit("enterToRoom", { roomId, userName });
    onLogin(userName);
    console.log(rooms);
    setIsLoading(false);
  };
  function keyDown(e) {
    if (e.key === "Enter") {
      onEnter(e);
    }
  }
  useEffect(() => {
    setInterval(() => socket.emit("getInfo"), 300);

    socket.on("sendInfo", function (rooms) {
      setRooms(rooms);
    });
  }, []);
  return (
    <div className="join-block">
      <input
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => {
          setRoomId(e.target.value);
        }}
        onKeyDown={keyDown}
      ></input>
      <input
        type="text"
        placeholder="Your nickname"
        value={userName}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
        onKeyDown={keyDown}
      ></input>
      <button onClick={onEnter} disabled={isLoading}>
        {!isLoading ? "Enter" : "Entering..."}
      </button>
    </div>
  );
}

export default JoinBlock;
