import {
    React, useRef, useState, useEffect,
} from 'react'; /* eslint-disable no-alert */
import { useHistory } from 'react-router-dom';
import { socket } from './App';
import './Login.css';
// import loadingCircle from './graphics/loading_circle.gif';

const sha256 = require('js-sha256');

function SignUp() {
    const [SignMode, SetSign] = useState(0);
    const [LogError,SetError] = useState(0);
    const [ErrMes,SetMes] = useState(null)
    const UserSign = useRef(null);
    const PassSign = useRef(null);
    const History = useHistory();
    function ToLogin() {
        History.push('/login');
    }
    function InpData() {
        // console.log(`In funct | ${SignMode}`);
        SetError(0);
        if (SignMode === 1) {
            UserSign.current.value = '';
            PassSign.current.value = '';
            // console.log('Sign-in Flag hit. Returning.');
            return 1;
        }

        const NewUser = UserSign.current.value;
        const UserPass = PassSign.current.value;

        if (NewUser === '' || UserPass === '') {
            //window.alert('One of the registry fields is missing.');
            SetMes('One of the registry fields is missing.');
            SetError(1);
            return -1;
        }

        if (NewUser !== '' && UserPass !== '') {
            const PassEncrypt = sha256(UserPass);
            socket.emit('signup_request', {
                username: NewUser,
                password: PassEncrypt,
            });
            // console.log('Data emitted!');
            UserSign.current.value = '';
            PassSign.current.value = '';
            SetSign(1);
        }
    }
    useEffect(() => {
        socket.on('signup_response', (ServData) => {
            // console.log('Server data recieved.');
            // console.log(ServData.status);
            if (ServData.status === 0) {
                window.alert('Registration successful! Please log in.');
                ToLogin();
            } else {
                SetSign(0);
                SetError(1);
                //window.alert('Username is taken. Please use a different one.');
                SetMes('Username is taken. Please use a different one.');

                
                // console.log('User tried to use an already existing username.');
            }
        });
    }, []);

    return (
        <div>
            <p>
                This is the Signup Page. Enter A username and password.
                {' '}
                <br />
                After creating an account the user will be redirected to the login page!
            </p>
            <form className="register-form">
                <input type="text" ref={UserSign} placeholder="new-user" />
                <br />
                <input type="password" name="password" ref={PassSign} placeholder="new-password" />
                <br />
                <button type="button" onClick={() => InpData()}> Click to signup! </button>
            </form>
            {LogError === 1 ? (
                <div>
                <h4> {ErrMes}</h4>
                </div>
            
            ): null}
        </div>

    );
}

export default SignUp;
