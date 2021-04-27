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
    const history = useHistory()
    function to_home(){
        history.push('/')
    }
    function inp_data(){
        console.log("In funct");
        console.log(SignMode)

        if (SignMode === 1) {
            UserSign.current.value = '';
            PassSign.current.value = '';
            console.log("Sign-in Flag hit. Returning.");
            return 1;
        }

        const NewUser = UserSign.current.value;
        const UserPass = PassSign.current.value;
        
        console.log(NewUser + " " + UserPass);
        if (NewUser === '' || UserPass === '') {
            window.alert("One of the registry fields is missing.");
            return -1;
        }
        
        else if (NewUser !== '' && UserPass !== ''){
            const pass_encrypt = sha256(UserPass)
            console.log(pass_encrypt)
            socket.emit('signup_request',{
                username:NewUser,
                password:UserPass
            });
            console.log("Data emitted!")
            UserSign.current.value = '';
            PassSign.current.value = '';
            SetSign(1);

        }
    }
     useEffect(() => {
         socket.on('signup_response',(serv_data)=>{
             console.log("Server data recieved.");
             console.log(serv_data.status)
             if (serv_data.status === 0){
                 to_home();
             }
             else{
                 SetSign(0)
                 console.log("User tried to use an already existing username.")
             }
         });
         
     },[]);
             
     
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
                <button type="button" onClick ={() => inp_data()} > Click to signup! </button>
            </form>
        </div>
       
        );
}

export default SignUp;
