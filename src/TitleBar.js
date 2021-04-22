/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

// Title bar allowing navigation to different pages and login/signup
import { React, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './TitleBar.css';
import plazaLogo from './graphics/Plaza.png';

// eslint-disable-next-line import/prefer-default-export
export function TitleBar(props) {
    // eslint-disable-next-line react/prop-types
    const { isLoggedIn, username } = props;

    const history = useHistory();
    const location = useLocation();

    const titlebarDiv = useRef(null);
    const buttonCanvas = useRef(null);
    const buttonHistory = useRef(null);
    const buttonLogin = useRef(null);
    const buttonSignup = useRef(null);
    const buttonTutorial = useRef(null);

    function Navigate(destination) {
        history.push(`/${destination}`);
    }

    useEffect(() => {
        if (titlebarDiv != null) {
            const p = location.pathname;

            buttonCanvas.current.className = '';
            buttonHistory.current.className = '';
            buttonTutorial.current.className = '';
            if (!isLoggedIn) {
                buttonSignup.current.className = '';
                buttonLogin.current.className = '';
            }

            if (p === '/') {
                buttonCanvas.current.className = 'selectedButton';
            } else if (p === '/history') {
                buttonHistory.current.className = 'selectedButton';
            } else if (p === '/signup') {
                if (!isLoggedIn) buttonSignup.current.className = 'selectedButton';
            } else if (p === '/login') {
                if (!isLoggedIn) buttonLogin.current.className = 'selectedButton';
            } else if (p === '/tutorial') {
                buttonTutorial.current.className = 'selectedButton';
            }
        }
    }, [isLoggedIn, location]);

    return (
        // TODO: Implement titlebar
        <div className="TitleBar" ref={titlebarDiv}>
            <img src={plazaLogo} alt="Plaza" />
            <div className="Navigation middle">
                <button type="button" ref={buttonCanvas} onClick={() => Navigate('')}>Canvas</button>
                <button type="button" ref={buttonHistory} onClick={() => Navigate('history')}>History</button>
                <button type="button" ref={buttonTutorial} onClick={() => Navigate('tutorial')}>Tutorial</button>
            </div>
            {!isLoggedIn ? (
                <div className="Navigation">
                    <button type="button" ref={buttonLogin} onClick={() => Navigate('login')}>Login</button>
                    <button type="button" ref={buttonSignup} onClick={() => Navigate('signup')}>Signup</button>
                </div>
            ) : (
                <span className="Navigation" style={{ marginRight: '20px', marginTop: '7px' }}>
                    Logged in as
                    {'\u00A0'}
                    <b>{username}</b>
                </span>
            )}
        </div>
    );
}
