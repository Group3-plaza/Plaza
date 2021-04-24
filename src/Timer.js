/* eslint-disable no-unused-vars */
/* eslint-disable no-else-return */

import './Timer.css';
import {
    React,
    useState,
    useEffect,
    useRef,
} from 'react';
// eslint-disable-next-line import/no-cycle
import { socket } from './App';
import { ColorPicker } from './ColorPicker';

// eslint-disable-next-line import/prefer-default-export
export function Timer(props) {
    // obtain props
    const {
        username,
        color,
        setSelectedColor,
        timerStartFlag,
        setTimerStartFlag,
    } = props;
    const TIMER = 10; // how many seconds between pixel placements

    const [tState, settState] = useState(0);
    // state:
    // 0 - first time loading up
    // 1 - color picker visible
    // 2 - timer visible

    // remaining seconds before user can place new pixel
    const [timer, _setTimer] = useState(TIMER);
    const timerRef = useRef(timer);
    const setTimer = (value) => {
        timerRef.current = value;
        _setTimer(value);
    };

    let intervalTimer;
    function beginTimer() {
        intervalTimer = setInterval(() => {
            let remaining = timerRef.current;
            remaining -= 1;
            setTimer(remaining);
            if (remaining <= 0) {
                clearInterval(intervalTimer);
            }
        }, 1000);
    }

    useEffect(() => {
        if (tState === 0) {
            // send socketio request to obtain last time pixel was placed:
            socket.emit('timer_request', { username });
            socket.on('timer_response', (data) => {
                // receive timer response:
                const t = ((data.time - Math.floor(Date.now() / 1000))) + TIMER;
                if (t > 0) {
                    setTimer(t);
                    settState(2);
                    beginTimer();
                } else {
                    settState(1);
                }
            });
        }
    }, [tState]);

    useEffect(() => {
        if (tState !== 0) {
            if (timer > 0) {
                if (tState !== 2) settState(2);
            } else {
                settState(1);
            }
        }
    }, [timer]);

    useEffect(() => {
        if (timerStartFlag) {
            setTimerStartFlag(false);
            setTimer(TIMER);
            beginTimer();
        }
    }, [timerStartFlag]);

    if (tState === 0) {
        return (null);
    } else if (tState === 1) {
        return (
            <div className="shadow container colorPicker">
                <ColorPicker
                    color={color}
                    setSelectedColor={setSelectedColor}
                />
            </div>
        );
    } else if (tState === 2) {
        return (
            <div className="timer">
                <h1>{timer}</h1>
                <span>Next Pixel In</span>
            </div>
        );
    }
}
