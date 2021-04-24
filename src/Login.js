/* eslint-disable max-len */
/* eslint-disable import/no-cycle */
import {
    React, useRef, useState, useEffect,
} from 'react'; /* eslint-disable no-alert */
import { useHistory } from 'react-router-dom';
import App, { socket } from './App';

import { Router } from './Router';
import './Login.css';
import loadingCircle from './graphics/loading_circle.gif';

export default function Login() {
    
    const [mode, setMode] = useState(0);

    const userInput = useRef(null);
    const passInput = useRef(null);

    const LoginPlaceholderRef = useRef(null);

    function confirm() {
        const username = userInput.current.value;
        const password = passInput.current.value;
        console.log('HASH: ');
        if (username !== '' && password !== '') {
            const sha256 = require('js-sha256');

            const encrypt = sha256(password);
            console.log(encrypt);
            setMode(1);
            socket.emit('login_request', { username, password: encrypt });
        } else {
            window.alert('Username or Password has not been filled');
        }
    }

    function errorMessage() {
        if (mode === 2) {
            return (
                <div>
                    <p>Incorrect username or password. Please try again</p>
                </div>
            );
        }
    }

    useEffect(() => {
        socket.on('login_response', (status) => {
            setMode(0);
            if (status.status === 0) {
                const userAuthentication = '...';
                console.log(`${status.status} has been recieved`);
                /* Unsure on how to change Login status or send authentication */
                return (
                    <div>
                        <Router
                            value="1"
                            userAuthentication={userAuthentication}
                        />
                    </div>
                );
            } if (status.status === 1) {
                console.log(`${status.status} has been recieved`);
                setMode(2);
            } else {
                window.alert('Status Unkown');
            }
        });
    }, []);

    if (mode === 1) {
        return (
            <div id="canvas" className="login_placeholder" ref={LoginPlaceholderRef}>
                <div id="placeholder_content">
                    <img data-testid="loading_circle" src={loadingCircle} alt="" />
                </div>
            </div>
        );
    }

    return (
        <div>
            <head>
                <title>Login to play with canvas</title>
            </head>
            <body>
                <div className="login-page">
                    <div className="form">
                        <form className="register-form">
                            <input type="text" ref={userInput} placeholder="username" />
                            <input type="text" ref={passInput} placeholder="password" />
                            <button onClick={(userInput, passInput) => confirm(userInput, passInput)}>
                                Login!
                            </button>
                            <div className="ErrorMessasge">{errorMessage()}</div>
                        </form>
                    </div>
                </div>
            </body>

        </div>
    );
}
