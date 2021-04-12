// Color picker that allows the selection of a color to be used by Canvas.js
import {useState} from 'react';
import { ColorBox } from './ColorBox';

export function ColorPicker(props) {
    [color, setColor] = useState(null);
    const colorsHex = {
        0: null,
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null,
        8: null,
        9: null,
        10: null,
        11: null,
        12: null,
        13: null
    };
    //colors to fill squares
    const backgroundColors = [
        
    ]
    //when a user clicks on a specific color
    function onClickColor(index){
        //TODO set color to text of the color or hex value?????
        setColor(colorsHex[index]);

    }


    return (
        //add colorboard to css styling for box to conatain colors 
        <div className="colorboard">
            {colors.map((item, index) => (
            <ColorBox value={item} onClick={() => onClickColor(index) } color={color}/>
            ))}
        </div>
    )
}