/* eslint max-len: ["error", { "code": 150 }] */
/* eslint no-magic-numbers: ["error", { "ignore": [13] }] */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint no-useless-rename: "error" */
import {
    React, useState, useEffect, useRef,
} from 'react';
import io from 'socket.io-client';
import { Scrollbars } from 'react-custom-scrollbars';
import ListChat from './ListChat';
import './Chat.css';

const socket = io();
// Chat panel that allows users to communicate with all other users on the server
export default function Chat(props) {
    const [messageList, updateMessage] = useState([]);
    const inputRef = useRef(null);
    const { username, isEnabled, userAuthentication } = props;

    function sendMessage() {
        if (inputRef !== null) {
            const message = inputRef.current.value;
            if (message !== '') {
                socket.emit('chat_submit', { userAuthentication, message: `${username}: ${message}` });
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
            {isEnabled ? (
                <Scrollbars
                    autoHide
                    autoHeight
                    autoHeightMin={100}
                    autoHeightMax={900}
                >
                    <div className="messageList">
                        {messageList.map((message, index) => <ListChat key={index} message={message} />)}
                        <div className="chatbox">
                            <input placeholder=" Send a message" ref={inputRef} onKeyPress={(key) => keyPress(key)} tyep="text" />
                            <button onClick={sendMessage} type="button">Send</button>
                        </div>
                    </div>
                </Scrollbars>
            ) : (
                <Scrollbars
                    autoHide
                    autoHeight
                    autoHeightMin={100}
                    autoHeightMax={900}
                >
                    <div className="messageList">
                        {
                            messageList.map((message, index) => <ListChat key={index} message={message} />)
                        }
                        <div className="chatbox" style={{ width: '240px' }}>
                            <p style={{ textAlign: 'center', flex: '1' }}>Log in to send messages</p>
                        </div>
                    </div>
                </Scrollbars>
            )}
        </div>
    );
}
