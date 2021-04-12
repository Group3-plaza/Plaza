// Canvas that will display current pixel data.
import "./Canvas.css";
import React from 'react';
import { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import {socket} from "./App.js";
import loading_circle from './graphics/loading_circle.gif';

export function Canvas(props) {
    var Renderer;

    // STATES
    const [mode, setMode] = useState(0);  // current mode of canvas:
                                            //  0 - Obtaining canvas data...
                                            //  1 - Timeout obtaining canvas data...
                                            //  2 - Success loading

    const [enabled, setEnabled] = useState(false); // set this to True to be able to click on canvas
    const [data, setData] = useState([]); // contains pixel data
    const [canvasSize, setCanvasSize] = useState(0);  // contains width (width=height) of canvas displayed pixels
                                                    // NOTE: This is different from HTML canvas size

    var canvas_ref = React.createRef();

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

    // convert color index to rgb
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
    // uses 'data' state to create pixels
    function redraw() {
        var context = canvas_ref.current.getContext('2d');
        var i = 0;
        
        var canvas_width = canvas_ref.current.width;
        var canvas_height = canvas_ref.current.height;

        var pixel_width = (canvas_height / canvasSize);
        var pixel_height = (canvas_height / canvasSize);

        var p1 = context.transformedPoint(0,0);
        var p2 = context.transformedPoint(canvas_width,canvas_height);
        context.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);

        for(var x=0;x<canvasSize;x++) {
            for(var y=0;y<canvasSize;y++) {
                var color = toColor(data[i]);
                i += 1;
                context.fillStyle= "rgb("+color[0] + "," + color[1] + "," + color[2] + ")";
                context.fillRect(x*pixel_width+x,y*pixel_height+y,pixel_width,pixel_height);
            }
        }    
    }

    // When canvas is loaded
    useEffect(()=>{
        if (mode == 2) {
            // IMPLEMENT CANVAS PANNING/ZOOMING     http://phrogz.net/tmp/canvas_zoom_to_cursor.html
            var canvas = canvas_ref.current;
            canvas.width = window.innerWidth - 50;
            canvas.height = window.innerHeight - 80;

            var ctx = canvas.getContext('2d');

            window.onresize = () => {
                canvas.width = window.innerWidth - 50;
                canvas.height = window.innerHeight - 80;
                trackTransforms(ctx);
                redraw();
            };
            
		    trackTransforms(ctx);
            ctx.translate(canvas.width/4,0);

            redraw();
		
            var lastX=canvas.width/2, lastY=canvas.height/2;
            var dragStart,dragged;
            canvas.addEventListener('mousedown',function(evt){
                document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
                lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
                lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
                dragStart = ctx.transformedPoint(lastX,lastY);
                dragged = false;
            },false);
            canvas.addEventListener('mousemove',function(evt){
                lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
                lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
                dragged = true;
                if (dragStart){
                    var pt = ctx.transformedPoint(lastX,lastY);
                    ctx.translate(pt.x-dragStart.x,pt.y-dragStart.y);
                    redraw();
                }
            },false);
            canvas.addEventListener('mouseup',function(evt){
                dragStart = null;
                if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
            },false);

            var scaleFactor = 1.05;
            var zoom = function(clicks){
                var pt = ctx.transformedPoint(lastX,lastY);
                ctx.translate(pt.x,pt.y);
                var factor = Math.pow(scaleFactor,clicks);
                ctx.scale(factor,factor);
                ctx.translate(-pt.x,-pt.y);
                redraw();
            }

            var handleScroll = function(evt){
                var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
                if (delta) zoom(delta);
                return evt.preventDefault() && false;
            };
            canvas.addEventListener('DOMMouseScroll',handleScroll,false);
            canvas.addEventListener('mousewheel',handleScroll,false);
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
                        <a onClick={test}>
                            Continue anyway
                        </a>
                    </div>
                </div>                
            </div>
        );
    } else if (mode == 2) {                                            // SUCESSFULLY LOADED CANVAS DATA FROM SERVER
        function onCanvasClick() {
            // TODO: implement something here...
        }

        return (
            <canvas
            id="canvas" onClick={onCanvasClick} ref={canvas_ref}>
            </canvas>
        );
    }

    // Adds ctx.getTransform() - returns an SVGMatrix
	// Adds ctx.transformedPoint(x,y) - returns an SVGPoint
	function trackTransforms(ctx){
		var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
		var xform = svg.createSVGMatrix();
		ctx.getTransform = function(){ return xform; };
		
		var savedTransforms = [];
		var save = ctx.save;
		ctx.save = function(){
			savedTransforms.push(xform.translate(0,0));
			return save.call(ctx);
		};
		var restore = ctx.restore;
		ctx.restore = function(){
			xform = savedTransforms.pop();
			return restore.call(ctx);
		};

		var scale = ctx.scale;
		ctx.scale = function(sx,sy){
			xform = xform.scaleNonUniform(sx,sy);
			return scale.call(ctx,sx,sy);
		};
		var rotate = ctx.rotate;
		ctx.rotate = function(radians){
			xform = xform.rotate(radians*180/Math.PI);
			return rotate.call(ctx,radians);
		};
		var translate = ctx.translate;
		ctx.translate = function(dx,dy){
			xform = xform.translate(dx,dy);
			return translate.call(ctx,dx,dy);
		};
		var transform = ctx.transform;
		ctx.transform = function(a,b,c,d,e,f){
			var m2 = svg.createSVGMatrix();
			m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
			xform = xform.multiply(m2);
			return transform.call(ctx,a,b,c,d,e,f);
		};
		var setTransform = ctx.setTransform;
		ctx.setTransform = function(a,b,c,d,e,f){
			xform.a = a;
			xform.b = b;
			xform.c = c;
			xform.d = d;
			xform.e = e;
			xform.f = f;
			return setTransform.call(ctx,a,b,c,d,e,f);
		};
		var pt  = svg.createSVGPoint();
		ctx.transformedPoint = function(x,y){
			pt.x=x; pt.y=y;
			return pt.matrixTransform(xform.inverse());
		}
	}
}