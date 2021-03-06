''' For use in database row models '''
from app import db  # pylint: disable=cyclic-import


class User(db.Model):  # pylint: disable=too-few-public-methods
    '''User entry'''
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=False, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    auth_token = db.Column(db.String(256), unique=False, nullable=False)
    last_placed = db.Column(db.Integer, nullable=False)
    pixel_num = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<Username %r>' % self.username


class Canvas(db.Model):  # pylint: disable=too-few-public-methods
    '''Canvas entry'''
    id = db.Column(db.Integer, primary_key=True)
    hours = db.Column(db.Integer, unique=False, nullable=False)
    x_cord = db.Column(db.Integer, unique=False, nullable=False)
    y_cord = db.Column(db.Integer, unique=False, nullable=False)
    color = db.Column(db.Integer, unique=False, nullable=True)

    def __repr__(self):
        return '<hours %r>' % self.hours
