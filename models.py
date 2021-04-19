from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=False, nullable=False)
    password= db.Column(db.String, nullable=False)
    
    def __repr__(self):
        return '<Username %r>' % self.username

class Canvas(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    hours =  db.Column(db.Integer, unique=False, nullable=False)
    x_cord = db.Column(db.Integer, unique=False, nullable=False)
    y_cord = db.Column(db.Integer, unique=False, nullable=False)
    color = db.Column(db.Integer, unique=False, nullable=True)
    
    def __repr__(self):
        return '<hours %r, x_cord %r, y_cord %r, color %r>' % (self.hours, self.x_cord, self.y_cord, self.color)