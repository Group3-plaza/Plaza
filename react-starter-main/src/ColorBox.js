// Color picker that allows the selection of a color to be used by Canvas.js
import {useState} from 'react';

export function ColorBox(props) {
    // this.props.color = color of the box 

    //hex value of the colors to return 
    const colorsHex = {
        0: '#FF0000', //red
        1: '#FF4500', //red-orange
        2: '#FF8C00', //orange
        3: '#FFA500', //yellow-orange
        4: '#FFFF00', //yellow
        5: '#ADFF2F', //yellow-green
        6: '#008000', //green
        7: '#20B2AA', //blue-green
        8: '#0000FF', //blue
        9: '#800080', //blue-violet
        10: '#EE82EE', //violet 
        11: '#9400D3', //red-violet
        12: '#FFFFFF', //white
        13: '#000000' //black
    };

    bColor = colorsHex[this.props.color]

    const boxStyle = {
        backgroundColor: bColor,
        border: '4px solid black'
    };

    return (
        //do inline styling for color from props 
    <div style={boxStyle} onClick={props.onClick}>{this.props.value}</div>
    )
}