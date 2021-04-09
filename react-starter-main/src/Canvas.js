// Canvas that will display current pixel data.
import "./Canvas.css";
import { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import loading_circle from './graphics/loading_circle.gif';

export function Canvas(props) {

    const [mode, setMode] = useState(0);  // current mode of canvas:
                                            //  0 - Obtaining canvas data...
                                            //  1 - Timeout obtaining canvas data...
                                            //  2 - Success loading

    const [enabled, setEnabled] = useState(false); // set this to True to be able to click on canvas
    const [data, setData] = useState([]); // contains pixel data
    const [boardSize, setBoardSize] = useState(0);  // contains size (width=height) of canvas displayed pixels
                                                    // NOTE: This is different from HTML canvas size

    if (mode == 0) {   // CANVAS INFO NOT YET LOADED

        window.addEventListener('load', () => {                         // OBTAINING CANVAS DATA FROM SERVER
            setTimeout(()=>{
                setMode(1);
            },5000);
        });

        return (
            <div id="canvas" className="canvas_placeholder">
                <div>
                    <img src={loading_circle}/>
                </div>                
            </div>
        );
    } else if (mode == 1) {                                            // TIMEOUT OBTAINING CANVAS DATA FROM SERVER
        return (
            <div id="canvas" className="canvas_placeholder">
                <div>
                    <div style={{padding: 40}}>
                        <h3>Unable to Load Canvas :(</h3>
                        <p><i>We were unable to get canvas data from our servers. Try reloading the page or trying again later.</i></p>
                    </div>
                </div>                
            </div>
        );
    } else if (mode == 2) {                                            // SUCESSFULLY LOADED CANVAS DATA FROM SERVER

        function onCanvasClick() {
            var canvas = document.getElementById("canvas");
            var context = canvas.getContext("2d");
            context.clearRect(0,0,canvas.width, canvas.height);
            context.font = "15px Consolas";
            context.fillText("Canvas was clicked", 180,250);
        }
    
        // When canvas is first loaded...
        window.addEventListener('load', () => {
            var canvas = document.getElementById("canvas");
            var context = canvas.getContext("2d");
            context.font = "15px Consolas";
            context.fillText("Canvas Element", 200,250);
        });

        return (
            <canvas id="canvas" onClick={onCanvasClick}>
                click me!
            </canvas>
        );
    }
}