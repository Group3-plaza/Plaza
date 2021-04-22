#pylint: disable=C0114
#pylint: disable=invalid-envvar-default
#pylint: disable=import-error
import os
import base64
from datetime import datetime  #alternative import time
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv, find_dotenv
from flask_socketio import SocketIO, emit
from flask import Flask, send_from_directory, json

# pylint: disable=global-statement
#pylint: disable=missing-function-docstring
#pylint: disable=missing-module-docstring
#pylint: disable=C0103
#pylint: disable=trailing-whitespace
#pylint: disable=wrong-import-position

#pylint: disable=import-self
load_dotenv(find_dotenv())

app = Flask(__name__, static_folder='./build/static')

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL2') 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# IMPORTANT: This must be AFTER creating db variable to prevent
# circular import issues
import canvasstate
from app import db
import models

db.create_all()

models.Canvas.query.all()
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

    result = models.User.query.filter_by(auth_token=data['userAuthentication']).first()
    if result is not None: # only propagate chat if user authentication token is valid
        socketio.emit("chat_update", data, broadcast=True)
    else:
        print("bad authentication token")

@socketio.on('canvas_request')
def on_request(data): # pylint: disable=unused-argument
    print("received emit from canvas")
    byte_array = canvasstate.get_state()
    dimensions = canvasstate.BOARD_SIZE
    now = datetime.now()
    seconds = now.second
    minutes = now.minute
    encoded = base64.b64encode(byte_array)
    D = {
        'data': encoded.decode("ascii"),
        'size': dimensions,
        'minutes': minutes,
        'seconds': seconds
    }

    emit("canvas_state", D) # emit instead of socketio.emit to only respond to sending client


@socketio.on("canvas_set")
def on_set(data):
    #current_time = time.time()
    now = datetime.now()
    #hours = now.hour
    seconds = now.second
    minutes = now.minute

    # update = models.Canvas(hours=hours,
    #                        x_cord=data['x'],
    #                        y_cord=data['y'],
    #                        color=data['color'])
    # db.session.add(update)
    # db.session.commit()

    canvasstate.set_pixel(minutes, seconds, data['x'], data['y'],data['color'])

    canvasstate.set_pixel(minutes, seconds, data['x'], data['y'],
                          data['color'])  #variable names subjedt to change

    socketio.emit("canvas_update", data, broadcast=True, include_self=True)


app.run(
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
)
