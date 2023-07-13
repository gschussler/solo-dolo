// main page: players join and see this
  //also when a round is over, players return to the lobby
import React, {useEffect, useState} from 'react';

const Lobby = ({socket, user, lobby}) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if(message !== "") {
      const messageContent = {
        lobby: lobby,
        user: user,
        message: message,
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
      };
      setMessage('');
      await socket.emit("send_message", messageContent);
      setMessageList((list) => [...list, messageContent]);
    }
  }
  
  const handleEnterPress = (e) => {
    if(e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  }

  useEffect(() => {
    socket.on("receive_message", (messageContent) => {
      console.log(messageContent);
      setMessageList((list) => [...list, messageContent]);
    });
  }, [socket])

  return (
    //Lobby starts out as a create button and a join button
    <div className='lobby'>
      <div className="lobby-h">
        <p className='welcome'>You are in the {lobby} lobby, let's goooo.</p>
      </div>
      <div className="lobby-body">
        {messageList.map((messageContent) => {
          return (
            <div className="message">
              <div className='message-c'>
                <p>{messageContent.message}</p>
              </div>
              <div className='message-info'>
                <p className='user'>{`sent by ${messageContent.user} at:`}</p>
                <p className='time'>{messageContent.time}</p>
              </div>
            </div>
          )
        })}
      </div>
      <div className="lobby-footer">
        <input
        className='text-input'
        type="text"
        placeholder='Send a message...'
        onChange={(e) => {
          setMessage(e.target.value)
          // console.log(message)
        }}
        />
        <button className='send' onKeyDown={handleEnterPress} onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

// {!setIsNamed ? (
//   <h1>Welcome to {lobbyName}!</h1>
// ) : (
//   <form onSubmit={handleSubmit}>
//     <input type='text' placeholder="Name your lobby!" value={lobbyName} onChange={handleNameChange} />
//     <button type='submit'>Submit Lobby Name</button>
//   </form>
// )}

export default Lobby;