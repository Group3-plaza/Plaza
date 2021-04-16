import os
import CanvasState
from datetime import datetime, time #alternative import time
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv, find_dotenv
from flask_socketio import SocketIO
from flask import Flask, send_from_directory, json, session, render_template
import base64

app = Flask(__name__, static_folder='./build/static')

#app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# IMPORTANT: This must be AFTER creating db variable to prevent
# circular import issues
import sqlalchemy
from app import db
import models
db.create_all()

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
    print("recieved chat from " + data['message'])
    socketio.emit("chat_update", data, broadcast=True, include_self=True)

@socketio.on('canvas_request')
def on_request(data):
    print("received emit from canvas")
    
    byte_array = CanvasState.getState()
    #print(len(byte_array))
    dimensions = CanvasState.BoardSize
    print(dimensions)
    
    #current_time = time.time()
    now = datetime.now()
    seconds = now.second
    minutes = now.minute

    encoded = base64.b64encode(byte_array)
    D = {
        'data' : encoded.decode("ascii"),
        'size' : dimensions,
        'minutes' : minutes,
        'seconds' : seconds
    }
    socketio.emit("canvas_state", D, broadcast=True,
                  include_self=True)

@socketio.on("canvas_set")
def on_set(data):
    #current_time = time.time()
    now = datetime.now()
    seconds = now.second
    minutes = now.minute

    byte_seconds = seconds.to_bytes(1, 'big')
    byte_minutes = minutes.to_bytes(1, 'big')
    CanvasState.setPixel(minutes, seconds, data['x'], data['y'], data['color']) #variable names subjedt to change

    socketio.emit("canvas_update", data, broadcast=True,
                  include_self=True)
     
app.run(
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
)