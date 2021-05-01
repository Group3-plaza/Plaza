#pylint: disable=C0114
#pylint: disable=invalid-envvar-default
#pylint: disable=import-error
import os
import base64
from datetime import datetime  #alternative import time
import time
import hashlib
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
        print("Bad authentication token -> Ignoring chat message...")

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
    result = models.User.query.filter_by(auth_token=data['auth_token']).first()
    if result is None:
        print("Bad authentication token -> Ignoring pixel placement")
        return

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
    

    canvasstate.set_pixel(minutes, seconds, data['x'], data['y'], data['color'])

    canvasstate.set_pixel(minutes, seconds, data['x'], data['y'],
                          data['color'])  #variable names subjedt to change

    # update last placed time
    result.last_placed = time.time()
    db.session.commit()

    socketio.emit("canvas_update", data, broadcast=True, include_self=True)

# receive login/signup emits:

@socketio.on("login_request")
def on_login_request(data):
    print("Received login request...")
    # look through database for username & password:
    result = models.User.query.filter_by(
        username=data['username'],
        password=data['password']
    ).first()
    if result is None:
        print("Incorrect username or password")
        # username or password is incorrect
        emit("login_response", {"status": 1})
    else:
        print("Returning auth token: " + result.auth_token)
        # username found
        emit("login_response", {"status": 0, "auth": result.auth_token})

@socketio.on("signup_request")
def on_signup_request(data):
    print("Recieved signup request...")
    print(data)
    # look through database of username to make sure it doesn't already exist:
    result = models.User.query.filter_by(username=data['username']).first()
    if result is not None:
        # error: user already exists:
        emit("signup_response", {"status": 1})
    else:
        # create new user:
        hash_obj = hashlib.sha256(str.encode(data['username']))
        new_user = models.User(
            username=data['username'],
            password=data['password'],
            auth_token=str(hash_obj.hexdigest()),
            last_placed=0,
            pixel_num=0
        )
        # add to database
        db.session.add(new_user)
        db.session.commit()
        
        # return response:
        emit("signup_response", {"status": 0})

@socketio.on("timer_request")
def on_timer_request(data):
    print("received timer request for " + data['username'])
    result = models.User.query.filter_by(username=data['username']).first()
    if result is not None:
        print("responding with time: " + str(result.last_placed))
        emit("timer_response", {"time": result.last_placed})


app.run(
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
)
