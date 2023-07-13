import React, {useEffect,useState} from 'react';
import Lobby from './Lobby'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3001');

const App = () => {
  const [user, setUser] = useState('');
  const [lobby, setLobby] = useState('');
  const [showLobby, setShowLobby] = useState(false);

  socket.on('connect', () => {
    console.log(`connected with: ${socket.id}`)
  })

  const joinLobby = (e) => {
    e.preventDefault();
    if(user !== "" && lobby !== "") {
      socket.emit('join_lobby', lobby)
      setShowLobby(true);
    }
  }

  const handleEnterPress = (e) => {
    if(e.key === 'Enter') {
      e.preventDefault();
      joinLobby();
    }
  }

  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     setMessReceived(data.message);
  //   })
  // }, [socket])
  return (
    <div className='App'>
      {!showLobby ? (
        <div className='welcome-container'>
          <h1 className='app-h'>Welcome!</h1>
          <h3 className='app-sh'>create or join a room!</h3>
          <div className='app-input'>
            <div className='app-user'>
              <p>Username:</p>
              <input
                className='app-input'
                type="text"
                placeholder='Choose your username!'
                onChange={(e) => {
                  setUser(e.target.value);
                }}
              />
            </div>
            <div className='app-lobby'>
              <p>Lobby Name:</p>
              <input
                className='app-input'
                type="text"
                placeholder='Create or join a lobby!'
                onChange={(e) => {
                  setLobby(e.target.value);
                }}
              />
            </div>
            <button className='app-j' onKeyDown={handleEnterPress} onClick={joinLobby}>ENTER</button>
          </div>
        </div>
      )
    : (
      <Lobby socket={socket} user={user} lobby={lobby}/>
    )}
    </div>
  )
};

// {/* <input
//         placeholder="Message..."
//         onChange={(e) => {setMessage(e.target.value)}}
//       />
//       <button onClick={sendMessage}>Send Message</button>
//       <p className="messages">{messReceived}</p> */}


// {/* <Lobby
//         socket={socket}
//         lobbyName={lobbyName}
//         setLobbyName={(e) => setLobbyName(e)}
//         setIsNamed={() => setIsNamed(true)}
//       /> */}

export default App;