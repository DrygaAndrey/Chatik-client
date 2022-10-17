import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import socket from "../socket";
import "./styles/chat.sass";

function Chat({ state }) {
  const [messageValue, setMessageValue] = useState("");
  const [hiddenComponentClassName, setHiddenComponentClassName] = useState("");
  const [currentUser, setCurrentUser] = useState({ id: 0 });
  const bottomRef = useRef(null);
  function buttonHandler(e) {
    e.preventDefault();
    if (messageValue === "") {
      return;
    }
    socket.emit("sendMessage", messageValue);
    setMessageValue("");
  }
  function keyDown(e) {
    if (e.key === "Enter") {
      buttonHandler(e);
    }
  }

  useLayoutEffect(() => {
    let user = state.users.find((user) => user.socketId == socket.id);
    if (user) {
      setCurrentUser(user);
    }
    console.log("user:", user);
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [state]);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div className="chat">
      <button
        className="hiddenButton"
        onClick={() => {
          if (hiddenComponentClassName === "") {
            setHiddenComponentClassName("show");
          } else {
            setHiddenComponentClassName("");
          }
        }}
      >
        ≡
      </button>
      <div className={`chat-users ${hiddenComponentClassName}`}>
        <b>
          Room {state.roomId} contain {state.users.length} users:
        </b>
        <ul>
          {state.users.map((user) => {
            let text = user.name;
            if (user.id === currentUser.id) {
              text = `${user.name} (You)`;
            }
            return <li key={user.id}>{text}</li>;
          })}
        </ul>
      </div>
      <div className="messagesAndForm">
        <div className="chat-messages">
          <div className="messages">
            {state.messages.length > 0 ? (
              state.messages.map((message) => {
                let className = "message";

                if (message.ownerId === currentUser.id) {
                  className = "currentUserMessage";
                }
                return (
                  <div className={className} key={Math.random()}>
                    <p>{message.text}</p>
                    <div>
                      <span>{message.ownerNickName}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="message">
                <p>There are no messages yet (⊙_⊙)</p>
                <div>
                  <span>Server info</span>
                </div>
              </div>
            )}
            {}
            <div ref={bottomRef}></div>
          </div>
        </div>
        <form>
          <input
            value={messageValue}
            onChange={(e) => {
              setMessageValue(e.target.value);
            }}
            onKeyDown={keyDown}
          ></input>
          <button
            onClick={(e) => {
              buttonHandler(e);
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
