// Color picker that allows the selection of a color to be used by Canvas.js
// import { useState } from 'react';

export function ColorBox(props) {

    const { color, clicked } = props;

    // convert color index to rgb
    function toColor(x) {
        if (x === 0) {
            return 'rgb(255, 0, 0)';
        } if (x === 1) {
            return 'rgb(255, 69, 0)';
        } if (x === 2) {
            return 'rgb(255, 165, 0)';
        } if (x === 3) {
            return 'rgb(255, 174, 66)';
        } if (x === 4) {
            return 'rgb(255, 255, 0)';
        } if (x === 5) {
            return 'rgb(154, 205, 50)';
        } if (x === 6) {
            return 'rgb(0, 255, 0)';
        } if (x === 7) {
            return 'rgb(13, 152, 186)';
        } if (x === 8) {
            return 'rgb(0, 0, 255)';
        } if (x === 9) {
            return 'rgb(138, 43, 226)';
        } if (x === 10) {
            return 'rgb(238, 130, 238)';
        } if (x === 11) {
            return 'rgb(199, 21, 133)';
        } if (x === 12) {
            return 'rgb(255, 255, 255)';
        } if (x === 13) {
            return 'rgb(0, 0, 0)';
        }
        return [0, 0, 0]; // index out of bounds
    }

    const bColor = toColor(color);
    let boxStyle = {
        backgroundColor: bColor,
        borderRadius: '50%',
        width: '40px',
        height: '40px',
    };

    // need a way to identify a singular color maybe index -> pass as a prop? 
    if (clicked && (props.which == color)) {
        boxStyle = {
            backgroundColor: bColor,
            border: '4px solid darkgrey',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
        };
    }

    return (
        // do inline styling for color from props
        <div className="colorbox" style={boxStyle} onClick={props.onClick}></div>
    );
}
