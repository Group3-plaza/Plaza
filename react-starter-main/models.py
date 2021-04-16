from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=False, nullable=False)
    password= db.Column(db.Integer, nullable=False)
    
    def __repr__(self):
        return '<Username %r>' % self.username