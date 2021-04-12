import logo from './logo.svg';
import './App.css';
import io from "socket.io-client";
import {useState, useEffect, useRef} from 'react';

// import project elements:
import { Canvas } from './Canvas.js';
import { ColorPicker } from './ColorPicker';
import { Chat } from './Chat';

export const socket = io();

function App() {

  // TODO: Conditionally render/configure elements based on whether or not user is logged-in.
  
  const [username, setUsername]=useState(null);
  const usernameRef= useRef(null);
  
  function onSetUsername(){
    if(usernameRef!==null){
      const user = usernameRef.current.value;
      if(user!==''){
        setUsername(user);
      }
    }
  }
  
  
  return (
    <div>
    {username ? (
      <div className="App">
      My username: {username}
        <div className="split left">
          <div className="color"><ColorPicker/></div>
          <div className="canvas"><Canvas username={username} /></div>
        </div>
        <div className="split right">
          <div className="chat"><Chat username={username} /></div>
        </div>
      </div>
      ):(
      <div className="App">
        <div>
          My username: <input ref={usernameRef} type="text"/>
          <button onClick={onSetUsername}>Login</button>
        </div>
        <div className="canvas"><Canvas/></div>
        <div className="chat"><Chat/></div>
      </div>
      )}
    </div>
  );
}

export default App;
