// Color picker that allows the selection of a color to be used by Canvas.js
import './ColorPicker.css';
import { useState } from 'react';
import { ColorBox } from './ColorBox';

export function ColorPicker(props) {
    // const [color, setColor] = useState(null);
    const [isClicked, setClicked] = useState(false);
    const [circleClicked, setCircleClicked] = useState(null);

    const { setSelectedColor } = props

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
        'Black',
    ];

    // when a user clicks on a specific color
    function onClickColor(index) {
        // set clicked = true and set the color that is clicked to pass to colorbox.js
        setClicked(true);
        setCircleClicked(index)

        // set the color in app.js
        setSelectedColor(index)

        console.log('clicked: ', index);
    }

    return (
        <div className="color-board">
            {colors.map((item, index) => (
                <ColorBox key={item} onClick={() => onClickColor(index)} color={index} clicked={isClicked} which={circleClicked} />
            ))}
        </div>
    );
}
