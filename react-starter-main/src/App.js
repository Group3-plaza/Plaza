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
import { Chat } from './Chat';

export const socket = io();

function App() {
    // TODO: Conditionally render/configure elements based on whether or not user is logged-in.

    // Render colorpicker and chat only after canvas loads
    // Set to useState(true) if you want to disable this for testing
    const [isCanvasLoaded, setCanvasLoadState] = useState(false);
    const [selectedColor, setSelectedColor] = useState(null);
    // set proper height of everything
    useEffect(() => {
        const colorPicker = document.getElementsByClassName('colorPicker');
        const chat = document.getElementsByClassName('chat');

        const horizontalElements = document.getElementsByClassName('horizontalElements');

        colorPicker.height = horizontalElements.height - colorPicker.margin_top
        - colorPicker.margin_bottom;

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
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
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
