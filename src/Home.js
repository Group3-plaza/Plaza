/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-else-return */

import { React, useState } from 'react';
import './TutorialPage.css';
import { useHistory } from 'react-router-dom';
import plazaLogo from './graphics/start_plaza.png';

// eslint-disable-next-line import/prefer-default-export
export function Home() {
    const History = useHistory();

    function ToLogin() {
        History.push('/login');
    }

    function ToSignUp() {
        History.push('/signup');
    }

    function ToTutorial() {
        History.push('/tutorial');
    }

    function ToCanvas() {
        History.push('/canvas');
    }

    return (
        <div className="tutorialSPage">
            <div className="startPage">
                <h1>WELCOME TO PLAZA!</h1>
                <h4>Authors: Naqeeb, Elijah, Philip, Colton, Hemang</h4>
                <h2>
                    Our mission is to provide an enjoyable and easy atmosphere for you to
                    tap into your inner artist! Chat with your friends while you see your
                    work come to life on our intuitive canvas!
                </h2>
                <button type="button" onClick={() => ToLogin()}>Login</button>
                <button type="button" onClick={() => ToSignUp()}>Sign up</button>
                <button type="button" onClick={() => ToCanvas()}>Canvas</button>
            </div>
            <div className="tutorialStart">
                <h1>TUTORIAL</h1>
                <h3>Click start to learn more about how to use our intuitive app!</h3>
                <button type="button" className="startButton">
                    <img src={plazaLogo} alt="start tutorial" onClick={ToTutorial} />
                </button>
            </div>
        </div>
    );
}
