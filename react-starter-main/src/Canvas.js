// Canvas that will display current pixel data.
import "./Canvas.css";
import { useState, useRef, useEffect } from "react";
import io from "socket.io-client";

function Canvas(props) {

    const [enabled, setEnabled] = useState(false);
    const [data, setData] = useState([]);

    function onCanvasClick() {
        alert("Canvas was clicked")
    }

    return (
        <canvas id="canvas" width="500" height="500" onCanvasClick={onCanvasClick}>
            click me!
        </canvas>
    );
}