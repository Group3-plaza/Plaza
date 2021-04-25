/* eslint-disable max-len */
/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
import {
    React, useRef, useState, useEffect,
} from 'react'; /* eslint-disable no-alert */
import { useHistory } from 'react-router-dom';
import { socket } from './App';

import { Router } from './Router';
import './Login.css';
import loadingCircle from './graphics/loading_circle.gif';

const sha256 = require('js-sha256');
const jwt = require('jsonwebtoken');

export default function Login() {
    const [mode, setMode] = useState(0);

    const userInput = useRef(null);
    const passInput = useRef(null);

    const LoginPlaceholderRef = useRef(null);

    const history = useHistory();

    function confirm() {
        const username = userInput.current.value;
        const password = passInput.current.value;

        if (username !== '' && password !== '') {
            const encrypt = sha256(password);
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
        return (<div />);
    }

    function Navigate(destination) {
        history.push(`/${destination}`);
    }

    useEffect(() => { /* eslint-disable consistent-return */
        socket.on('login_response', (status) => {
            if (status.status === 0) {
                const authToken = jwt.sign(
                    { userId: userInput },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' },
                );

                console.log(`${status.status} has been recieved`);
                /* Unsure on how to change Login status or send authentication */
                setMode(0);
                return (
                    <div>
                        <Router
                            userAuthentication={authToken}
                        />
                        <div>{Navigate('')}</div>
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
                            <input type="password" name="password" ref={passInput} placeholder="password" />
                            <button type="button" onClick={() => confirm(userInput, passInput)}>
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
