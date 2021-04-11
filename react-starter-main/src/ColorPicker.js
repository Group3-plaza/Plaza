// Color picker that allows the selection of a color to be used by Canvas.js
import {useState} from 'react';
import { ColorBox } from './ColorBox';

export function ColorPicker(props) {
    [color, setColor] = useState(null);

    //when a user clicks on a specific color
    function onClickColor(){

    }


    return (
        <div className="board">
            {board.map((item, index) => (
            <ColorBox value={item} onClick={() => onClickColor(index) }/>
            ))}
        </div>
    )
}