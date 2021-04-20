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

export const socket = io();

function App() {
    // TODO: Conditionally render/configure elements based on whether or not user is logged-in.

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

    // set proper height of everything
    useEffect(() => {
        const colorPicker = document.getElementsByClassName('colorPicker');
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
            {isCanvasLoaded
                && (
                    <div className="shadow container colorPicker">
                        <ColorPicker color={selectedColor} setSelectedColor={setSelectedColor} />
                    </div>
                )}

            <div className="container canvas">
                <Canvas
                    setCanvasLoadState={setCanvasLoadState}
                    selectedColor={selectedColorRef}
                />
            </div>

            {isCanvasLoaded
            && (
                <div className="shadow container chat">
                    <Chat username="Default User" />
                </div>
            )}
        </div>
    );
}

export default App;
