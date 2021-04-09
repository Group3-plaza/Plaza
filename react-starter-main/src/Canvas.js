// Canvas that will display current pixel data.
import "./Canvas.css";
import { useState, useRef, useEffect } from "react";
import io from "socket.io-client";

export function Canvas(props) {

    const [enabled, setEnabled] = useState(false);
    const [data, setData] = useState([]);

    function onCanvasClick() {
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");
        context.clearRect(0,0,canvas.width, canvas.height);
        context.font = "15px Consolas";
        context.fillText("Canvas was clicked", 180,250);
    }

    // draw text indicating that this is the canvas element
    window.addEventListener('load', () => {
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");
        context.font = "15px Consolas";
        context.fillText("Canvas Element", 200,250);
    });

    return (
        <canvas id="canvas" width="500" height="500" onClick={onCanvasClick}>
            click me!
        </canvas>
    );
}