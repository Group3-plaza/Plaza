/* eslint-disable no-unused-vars */
import './App.css';
import io from 'socket.io-client';

import {
    React, useState, useRef, useEffect,
} from 'react';

// import project elements:
// eslint-disable-next-line import/no-cycle
import { Canvas } from './Canvas';
import { ColorPicker } from './ColorPicker';
import Chat from './Chat';
import { Timer } from './Timer';

export const socket = io();

function App(props) {
    // eslint-disable-next-line react/prop-types
    const { isLoggedIn, userAuthentication, username } = props;

    // Render colorpicker and chat only after canvas loads
    // Set to useState(true) if you want to disable this for testing
    const [isCanvasLoaded, setCanvasLoadState] = useState(false);

    // use refs to fix issues with accessing states from listeners...
    // https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
    const [selectedColor, _setSelectedColor] = useState(-1);
    const selectedColorRef = useRef(selectedColor);
    const setSelectedColor = (value) => {
        selectedColorRef.current = value;
        _setSelectedColor(value);
    };

    const [timerStartFlag, setTimerStartFlag] = useState(false);

    // set proper height of everything
    useEffect(() => {
        // const colorPicker = document.getElementsByClassName('colorPicker');
        const chat = document.getElementsByClassName('chat');
        const horizontalElements = document.getElementsByClassName('horizontalElements');
        chat.height = horizontalElements.height - chat.margin_top;
    });

    // *** Use this to run code when the canvas loads successfully ***
    useEffect(() => {}, [isCanvasLoaded]);
    useEffect(() => {
        // eslint-disable-next-line no-console
        console.log('App.js color selected: ', selectedColor);
    }, [selectedColor]);

    return (
        <div className="horizontalElements">
            {(isCanvasLoaded && isLoggedIn)
                && (
                    <Timer
                        username={username}
                        color={selectedColor}
                        setSelectedColor={setSelectedColor}
                        timerStartFlag={timerStartFlag}
                        setTimerStartFlag={setTimerStartFlag}
                    />
                )}

            <div className="container canvas">
                <Canvas
                    userAuthentication={userAuthentication}
                    isLoggedIn={isLoggedIn}
                    setCanvasLoadState={setCanvasLoadState}
                    selectedColor={selectedColorRef}
                    setStartTimerFlag={setTimerStartFlag}
                    setSelectedColor={setSelectedColor}
                />
            </div>

            {isCanvasLoaded
            && (
                <div className="shadow container chat">
                    <Chat
                        isEnabled={isLoggedIn}
                        username={username}
                        userAuthentication={userAuthentication}
                    />
                </div>
            )}
        </div>
    );
}

export default App;
