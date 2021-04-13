import os
import CanvasState
from datetime import datetime, time #alternative import time
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv, find_dotenv
from flask_socketio import SocketIO
from flask import Flask, send_from_directory, json, session, render_template

app = Flask(__name__, static_folder='./build/static')

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')

cors = CORS(app, resources={r"/*": {"origins": "*"}})

socketio = SocketIO(app,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)

@socketio.on('connect')
def on_connect():
    print('User connected!')

@socketio.on('chat_submit')
def on_submit(data):
    socketio.emit("chat_update", data, broadcast=True, include_self=True)

@socketio.on('canvas_request')
def on_request(data):
    print("received emit from canvas")
    
    #byte_array = CanvasState.getState()
    
    dimensions = CanvasState.BoardSize
    print(dimensions)
    
    #current_time = time.time()
    now = datetime.now()
    seconds = now.second
    minutes = now.minute
    byte_seconds = seconds.to_bytes(1, 'big')
    byte_minutes = minutes.to_bytes(1, 'big')
    byte_array = [byte_seconds, byte_minutes]
    print(byte_array)
    #[byte_array, dimensions, minutes, seconds]
    #[byte_minutes, byte_seconds]
    socketio.emit("canvas_state", byte_array, broadcast=True,
                  include_self=True)

@socketio.on("canvas_set")
def on_set(data):
    #current_time = time.time()
    now = datetime.now()
    seconds = now.second
    minutes = now.minute

    byte_seconds = seconds.to_bytes(1, 'big')
    byte_minutes = minutes.to_bytes(1, 'big')
    CanvasState.setPixel(byte_minutes, byte_seconds, data.x, data.y, data.color) #variable names subjedt to change

    socketio.emit("canvas_update", data, broadcast=True,
                  include_self=True)
     
app.run(
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
)