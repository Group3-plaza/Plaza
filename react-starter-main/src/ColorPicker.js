// Color picker that allows the selection of a color to be used by Canvas.js
import './ColorPicker.css'
import {useState} from 'react';
import { ColorBox } from './ColorBox';

export function ColorPicker(props) {
    [color, setColor] = useState(null);
    [isClicked, setClicked] = useState(false);

    const colors = [
        'Red', 
        'Red-Orange', 
        'Orange', 
        'Yellow-Orange', 
        'Yellow', 
        'Yellow-Green', 
        'Green', 
        'Blue-Green', 
        'Blue', 
        'Blue-Violet', 
        'Violet',
        'Red-Violet',
        'White',
        'Black'
    ]

    //when a user clicks on a specific color
    function onClickColor(index){
        //TODO set color to text of the color or hex value?????
        setColor(index);
        setClicked(true);
    }


    return (
        //add colorboard to css styling for box to conatain colors 
        //map through and pass hex value to ColorBox
        <div className="color-board">
            {colors.map((item, index) => (
            <ColorBox value={item} onClick={() => onClickColor(index) } color={index} clicked={isClicked}/>
            ))}
        </div>
    )
}