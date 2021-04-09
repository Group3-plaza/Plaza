import os
import CanvasState
import time
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
def on_request():
    byte_array = CanvasState.getState()
    dimensions = len(byte_array)

    current_time = time.time()

    socketio.emit("canvas_state", [byte_array, dimensions, current_time], broadcast=True,
                  include_self=True)

@socketio.on("canvas_set")
def on_set(data):
    setPixel(data.pixel, data.color, time.time())

    socketio.emit("canvas_update", data, broadcast=True,
                  include_self=True)
     
app.run(
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
)
