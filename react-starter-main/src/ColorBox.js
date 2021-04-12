// Color picker that allows the selection of a color to be used by Canvas.js
import {useState} from 'react';

export function ColorBox(props) {
    // this.props.color = color of the box 
    return (
        //do inline styling for color from props 
        <div class="box" onClick={props.onClick}></div>
    )
}