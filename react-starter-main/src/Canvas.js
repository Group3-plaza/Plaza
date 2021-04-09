// Canvas that will display current pixel data.
import "./Canvas.css";
import React from 'react';
import { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import {socket} from "./App.js";
import loading_circle from './graphics/loading_circle.gif';

export function Canvas(props) {

    const [mode, setMode] = useState(0);  // current mode of canvas:
                                            //  0 - Obtaining canvas data...
                                            //  1 - Timeout obtaining canvas data...
                                            //  2 - Success loading

    const [enabled, setEnabled] = useState(false); // set this to True to be able to click on canvas
    const [data, setData] = useState([]); // contains pixel data
    const [canvasSize, setCanvasSize] = useState(0);  // contains width (width=height) of canvas displayed pixels
                                                    // NOTE: This is different from HTML canvas size

    var canvas_ref = React.createRef();
    var scale = 1;
    let buffer = null;

    // receive socketio canvas_state
    useEffect(() => {
        socket.on("canvas_state", (data) => {
            if (mode == 0) {
                alert("RECIEVED DATA FROM SERVER");
                setData(data.data);
                setMode(2);
            }            
        });
    }, []);

    // convert index to rgb
    function toColor(x) {
        if (x == 0) {
            return [255,0,0];
        } else if (x == 1) {
            return [255,69,0];
        } else if (x == 2) {
            return [255,165,0];
        } else if (x == 3) {
            return [255, 174, 66];
        } else if (x == 4) {
            return [255, 255, 0];
        } else if (x == 5) {
            return [154, 205, 50];
        } else if (x == 6) {
            return [0, 255, 0];
        } else if (x == 7) {
            return [13, 152, 186];
        } else if (x == 8) {
            return [0,0,255];
        } else if (x == 9) {
            return [138, 43, 226];
        } else if (x == 10) {
            return [238, 130, 238];
        } else if (x == 11) {
            return [199, 21, 133];
        } else if (x == 12) {
            return [255,255,255];
        } else if (x == 13) {
            return [0,0,0];
        } else {
            return [0,0,0]; // index out of bounds
        }
    }


    // uses 'data' to create pixels
    function drawData() {
        var context = canvas_ref.current.getContext('2d');
        var i = 0;
        
        var canvas_width = canvas_ref.current.width;
        var canvas_height = canvas_ref.current.height;

        var pixel_width = canvas_width / canvasSize;
        var pixel_height = canvas_height / canvasSize;

        context.clearRect(0,0,canvas_width,canvas_height);

        for(var x=0;x<canvasSize;x++) {
            for(var y=0;y<canvasSize;y++) {
                var color = toColor(data[i]);
                i += 1;
                context.fillStyle= "rgb("+color[0] + "," + color[1] + "," + color[2] + ")";
                context.fillRect(x*pixel_width* scale,y*pixel_height* scale,pixel_width* scale,pixel_height* scale);
            }
        }        
    }

    // OLD CODE FOR IMAGES:
    // functions for working with canvas state:
    /*function updateBuffer() {
        var len = canvasSize*canvasSize; // length of canvas data
        if (buffer == null)
            buffer = new Uint8ClampedArray(len*4); // buffer storing pixel data
        var i = 0 // buffer index
        for(var x=0;x<len;x++) { // for each item in data, convert to rgba and put into buffer
            var color = toColor(data[x]);
            buffer[i] = color[0];
            i++;
            buffer[i] = color[1];
            i++;
            buffer[i] = color[2];
            i++;
            buffer[i] = 255
            i++;
        }
        var context = document.getElementById("canvas").getContext('2d');
        var img_data = context.createImageData(500,500);
        img_data.data.set(buffer);
        
        context.putImageData(img_data,100,100);
    } */


    useEffect(()=>{
        if (mode == 2) {
            drawData();
        }
    },[canvasSize]);

    // testing function
    function test() {
        const TESTING_SIZE = 50;

        setCanvasSize(TESTING_SIZE);

        var a = new Uint8ClampedArray(TESTING_SIZE*TESTING_SIZE)
        for(var x=0;x<TESTING_SIZE*TESTING_SIZE;x++) {
            a[x] = (Math.random() * (13 - 0 + 1) ) << 0; // generate random int between 0 & 13
        }

        setData(a);
        setMode(2);
    }

    if (mode == 0) {   // CANVAS INFO NOT YET LOADED

        window.addEventListener('load', () => {                         // OBTAINING CANVAS DATA FROM SERVER
            socket.emit("canvas_request",{});
            setTimeout(()=>{
                setMode(1);
            },2000);
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
                        <a style={{color: "blue", cursor: "pointer"}} onClick={test}>
                            Continue anyway
                        </a>
                    </div>
                </div>                
            </div>
        );
    } else if (mode == 2) {                                            // SUCESSFULLY LOADED CANVAS DATA FROM SERVER
        function onCanvasClick() {
            var ctx = canvas_ref.current.getContext('2d');
            var anim = setInterval(()=>{
                scale += .4;
                drawData();

                if (scale >= 4) {
                    clearInterval(anim);
                }
            }, 50);
        }
    
        // When canvas is first loaded...
        window.addEventListener('load', () => {
            var canvas = document.getElementById("canvas");
            var context = canvas.getContext("2d");
            context.font = "15px Consolas";
            context.fillText("Canvas Element", 200,250);
        });

        return (
            <canvas id="canvas" onClick={onCanvasClick} ref={canvas_ref}>
            </canvas>
        );
    }
}