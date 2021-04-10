import {useState, useEffect, useRef} from 'react';
import io from 'socket.io-client';
import { ListChat } from './ListChat.js';
import './Chat.css';

const socket = io();
// Chat panel that allows users to communicate with all other users on the server
export function Chat(props) {
    const [messageList, updateMessage] = useState([]);
    const inputRef = useRef(null);
    //const [message, setMessages] = useState("");
    const username = props.username;
    
    function sendMessage() {
        if (inputRef != null) {
            const message = inputRef.current.value;
            if (message!= ''){
                socket.emit('chat_submit', { username: username, message: username + ": " +message });
                inputRef.current.value="";
            }
        }
    }
    
    useEffect(() => {
        socket.on('chat_update', (data) => {
          updateMessage(prevMessages => [...prevMessages, data.message]);
        });
     }, []);
    
    return (
        <div className="Chat">
            {username ? (
            <div>
                {messageList.map((message, index)=> <ListChat key={index} message={message} />)}
                <div className="chatbox">
                    <input placeholder=" Send a message" ref={inputRef} tyep="text"/>
                    <button onClick={sendMessage}>ENTER</button>
                </div>
            </div>
            ):(
            <div>
                {messageList.map((message, index)=> <ListChat key={index} message={message} />)}
                <div className="chatbox">
                    <input placeholder=" Send a message" ref={inputRef} tyep="text"/>
                    <button>ENTER</button>
                </div>
            </div>
            )}
        </div>
    );
}