// Color picker that allows the selection of a color to be used by Canvas.js
import {useState} from 'react';

export function ColorBox(props) {

    return (
        <div class="box" onClick={props.onClick} >{props.value}</div>
    )
}