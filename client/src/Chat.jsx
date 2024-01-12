import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, room, userName }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  }, [socket, messageList]);

  const sendMessage = async () => {
    if (currentMessage) {
      const messageData = {
        room,
        author: userName,
        time: new Date(Date.now()).toLocaleTimeString(),
        message: currentMessage,
      };

      await socket.emit("send_message", messageData);

      setMessageList([...messageList, messageData]);
      setCurrentMessage("");
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {/* <div className="message-content"> */}
        <ScrollToBottom className="message-container">
          {messageList.map((data, index) => (
            <div
              className="message"
              id={userName === data.author ? "you" : "other"}
              key={index}
            >
              <div>
                <div className="message-content">
                  <p>{data.message} </p>
                </div>
                <div className="message-meta">
                  <p>{data.time}&nbsp; </p>
                  <p>{data.author}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollToBottom>

        {/* </div> */}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          onKeyDown={(event) => event.key === "Enter" && sendMessage()}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Message..."
        />
        <button onClick={sendMessage} title="send"></button>
      </div>
    </div>
  );
};

export default Chat;
