/* eslint-disable max-len */
/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
import {
    React, useRef, useState, useEffect,
} from 'react'; /* eslint-disable no-alert */
import { useHistory } from 'react-router-dom';
import { socket } from './App';

// import { Router } from './Router';
import './Login.css';
import loadingCircle from './graphics/loading_circle.gif';

const sha256 = require('js-sha256');

export default function Login(props) {
    // eslint-disable-next-line react/prop-types
    const { setUserAuth, setUserLoginStatus, setUsername } = props;

    const [mode, setMode] = useState(0);
    const [_username, _setUsername] = useState(null);

    const userInput = useRef(null);
    const passInput = useRef(null);

    const LoginPlaceholderRef = useRef(null);

    const history = useHistory();

    function confirm() {
        const username = userInput.current.value;
        _setUsername(username);
        const password = passInput.current.value;

        if (username !== '' && password !== '') {
            const encrypt = sha256(password);
            setMode(1);
            socket.emit('login_request', { username, password: encrypt });
        } else {
            setMode(3);
        }
    }

    function errorMessage() {
        if (mode === 2) {
            return (
                <div className="error">
                    <p>
                        Incorrect username or password.
                        <br />
                        Please try again
                    </p>
                </div>
            );
        }

        if (mode === 3) {
            return (
                <div className="error">
                    <p>Please enter a username and password</p>
                </div>
            );
        }
        return (<div />);
    }

    function Navigate(destination) {
        history.push(`/${destination}`);
    }

    function keyPress(key) {
        if (key.charCode === 13) {
            confirm(userInput, passInput);
        }
    }

    useEffect(() => { /* eslint-disable consistent-return */
        if (mode === 1) {
            socket.on('login_response', (status) => {
                console.log(`Received login response: ${status.status} ${status.auth}`);
                if (status.status === 0) {
                    console.log(`${status.status} has been recieved`);
                    /* Unsure on how to change Login status or send authentication */
                    // setMode(0);

                    setUserLoginStatus(true);
                    setUserAuth(status.auth);
                    setUsername(_username);

                    Navigate('canvas');
                } else if (status.status === 1) {
                    console.log(`${status.status} has been recieved`);
                    setMode(2);
                } else {
                    window.alert('Status Unkown');
                }
            });
        }
    }, [mode]);

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
                        <p className="subheader">Log in to interact with the canvas and chat</p>
                        <form className="register-form">
                            <input type="text" ref={userInput} onKeyPress={(key) => keyPress(key)} placeholder="Enter your username..." />
                            <input type="password" name="password" ref={passInput} onKeyPress={(key) => keyPress(key)} placeholder="Enter your password..." />
                            <button type="button" className="login_button" onClick={() => confirm(userInput, passInput)}>
                                Login
                            </button>
                            <div className="ErrorMessasge">{errorMessage()}</div>
                        </form>
                    </div>
                </div>
            </body>

        </div>
    );
}
