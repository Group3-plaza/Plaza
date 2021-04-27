import {
    React, useRef, useState, useEffect,
} from 'react'; /* eslint-disable no-alert */
import { useHistory } from 'react-router-dom';
import { socket } from './App';

import { Router } from './Router';
import './Login.css';
import loadingCircle from './graphics/loading_circle.gif';

const sha256 = require('js-sha256');
const jwt = require('jsonwebtoken');

function SignUp(){
    const [SignMode,SetSign] = useState(0)
    const UserSign = useRef(null)
    const PassSign = useRef(null)
    
    function inp_data(){
        let NewUser = UserSign.current.value;
        let UserPass = PassSign.current.value;
        if (NewUser === null || UserPass === null) {
            window.alert("One of the registry fields are missing.")
            return -1
        } 
    }
    
    return (
        <div>
            <p>
                This is the Signup Page. Enter A username and password.
            </p>
            <form className="register-form">
                <input type="text" ref={UserSign} placeholder="new-user" />
                <br/>
                <input type="password" name="password" ref={PassSign} placeholder="new-password" />
                <br/>
                <button> Click to signup! </button>
            </form>
        </div>
       
        );
}

export default SignUp;
