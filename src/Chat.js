/* eslint max-len: ["error", { "code": 150 }] */
/* eslint no-magic-numbers: ["error", { "ignore": [13] }] */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import {
    React, useState, useEffect, useRef,
} from 'react';
import io from 'socket.io-client';
import { ListChat } from './ListChat';
import './Chat.css';

const socket = io();
// Chat panel that allows users to communicate with all other users on the server
export default function Chat(props) {
    const [messageList, updateMessage] = useState([]);
    const inputRef = useRef(null);
    const { username } = props;

    function sendMessage() {
        if (inputRef !== null) {
            const message = inputRef.current.value;
            if (message !== '') {
                socket.emit('chat_submit', { username, message: `${username}: ${message}` });
                inputRef.current.value = '';
            }
        }
    }

    function keyPress(key) {
        if (key.charCode === 13) {
            sendMessage();
        }
    }

    useEffect(() => {
        socket.on('chat_update', (data) => {
            updateMessage((prevMessages) => [...prevMessages, data.message]);
        });
    }, []);

    return (
        <div className="Chat">
            {username ? (
                <div className="messageList">
                    {messageList.map((message, index) => <ListChat key={index} message={message} />)}
                    <div className="chatbox">
                        <input placeholder=" Send a message" ref={inputRef} onKeyPress={(key) => keyPress(key)} tyep="text" />
                        <button onClick={sendMessage} type="button">Send</button>
                    </div>
                </div>
            ) : (
                <div className="messageList">
                    {
                        messageList.map((message, index) => <ListChat key={index} message={message} />)
                    }
                    <div className="chatbox">
                        <input placeholder=" Send a message" ref={inputRef} tyep="text" />
                        <button type="button">Send</button>
                    </div>
                </div>
            )}
        </div>
    );
}
