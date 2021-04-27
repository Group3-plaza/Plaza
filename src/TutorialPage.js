/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { React, useState } from 'react';
import './TutorialPage.css';
import plazaLogo from './graphics/Plaza.png';
import colorPicker from './graphics/colorpicker.png';
import canvas from './graphics/canvas.png';
import chat from './graphics/chat.png';


export function TutorialPage(props) {
    const [start, setStart] = useState(false);
    // <button class="button">Next</button>

    function onClickStart() {
        setStart(true);
        console.log('Start clicked')
    }

    <img class='tchat' src={chat} />
    if(start){
        return (

            <div class='tutorialPage'>
                <h1>WELCOME TO THE PLAZA TUTORIAL!</h1>
                <h4>Authors: Naqeeb, Phillip, Elijah, Colton, Hemang</h4>
                <h4>Hover to find out about each element!</h4>

                <div class='threedivs'> 
                    <div class='tcolor'>
                        <div class="coloroverlay">
                            <div class="text">Color Picker</div>
                        </div>
                    </div>
                    <div class='tcanvas'>
                        <div class="canvasoverlay">
                            <div class="text">Canvas</div>
                        </div>
                    </div>
                    <div class='tchat'>
                        <div class="chatoverlay">
                            <div class="text">
                                Chat
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }else{
        return(
            <div class='tutorialPage'>
                <div class='startPage'>
                    <h1>WELCOME TO THE PLAZA TUTORIAL!</h1>
                    <h3>Click start to learn more about/how to use our intuitive app!</h3>
                    <button class='startButton'>
                        <img src={plazaLogo} alt='start tutorial' onClick={onClickStart}/>
                    </button>
                </div>
                
            </div>
        );
    }
    
}
