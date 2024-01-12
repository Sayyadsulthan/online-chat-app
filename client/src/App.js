import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io(process.env.REACT_APP_BASE_URL);
function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [show, setShow] = useState(false);
  const handleJoinRoom = () => {
    if (userName && room) {
      socket.emit("join_room", room);
      setShow(!show);
    }
  };

  return (
    <div className="App">
      {!show ? (
        <div className="joinChatContainer">
          <h3>Join Chat Room</h3>
          <input
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            placeholder="john..."
          />
          <input
            type="text"
            onChange={(e) => setRoom(e.target.value)}
            value={room}
            placeholder="12abc.."
          />
          <button onClick={handleJoinRoom}>Join</button>
        </div>
      ) : (
        <Chat socket={socket} room={room} userName={userName} />
      )}
    </div>
  );
}

export default App;
