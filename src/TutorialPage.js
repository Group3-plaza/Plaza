/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-else-return */

import { React } from 'react';
import './TutorialPage.css';

// eslint-disable-next-line import/prefer-default-export
export function TutorialPage() {
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
}
