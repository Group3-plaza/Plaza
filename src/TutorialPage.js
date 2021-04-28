/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-else-return */

import { React, useState } from 'react';
import './TutorialPage.css';
import plazaLogo from './graphics/start_plaza.png';

// eslint-disable-next-line import/prefer-default-export
export function TutorialPage() {
    const [start, setStart] = useState(false);
    // <button class="button">Next</button>

    function onClickStart() {
        setStart(true);
    }


    // notes: left boarder with different colors( about page ) and right is grid background to tutorial 
    if (start) {
        return (

            <div className="tutorialPage">
                <div className="tutorial_header">
                    <h1>WELCOME TO THE PLAZA TUTORIAL!</h1>
                    <h4>Hover to find out about each element!</h4>
                </div>

                <div className="threedivs">
                    <div className="tcolor">
                        <div className="coloroverlay">
                            <div className="text">
                                <h4>COLOR PICKER</h4>
                                To select a color to place on the canvas simply
                                click on a color from our 14 different options!
                            </div>
                        </div>
                    </div>
                    <div className="tcanvas">
                        <div className="canvasoverlay">
                            <div className="text">
                                <h4>CANVAS</h4>
                                Make your work come to life in the canvas.
                                This is where you can color specific pixels,
                                all you have to do is click!
                            </div>
                        </div>
                    </div>
                    <div className="tchat">
                        <div className="chatoverlay">
                            <div className="text">
                                <h4>CHAT</h4>
                                Chat with other users while you are logged in!
                                Just type in the chat bar and hit send!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="tutorialSPage">
                <div className="startPage">
                    
                    <h1>WELCOME TO PLAZA!</h1>
                    <h4>Authors: Naqeeb, Elijah, Phillip, Colton, Hemang</h4>
                    <h2>
                        Our mission is to provide an enjoyable and easy atmosphere for you to 
                        tap into your inner artist! Chat with your friends while you see your 
                        work come to life on our intuitive canvas! 
                    </h2>
                </div>
                <div className="tutorialStart">
                    <h1>TUTORIAL</h1>
                    <h3>Click start to learn more about how to use our intuitive app!</h3>
                    <button type="button" className="startButton">
                        <img src={plazaLogo} alt="start tutorial" onClick={onClickStart} />
                    </button>
                </div>
            </div>
        );
    }
}
