import logo from './logo.svg';
import './App.css';
import io from "socket.io-client";

// import project elements:
import {Canvas} from './Canvas.js';
import { ColorPicker } from './ColorPicker';
import { Chat } from './Chat';

export const socket = io();

function App() {

  // TODO: Conditionally render/configure elements based on whether or not user is logged-in.

  return (
    <div className="App">
      <ColorPicker/>
      <Canvas/>
      <Chat/>
    </div>
  );
}

export default App;
