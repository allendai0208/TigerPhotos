from backend import db
from datetime import datetime

# This defines the columns and data types of the Photographer table. 
# Note that photographer_netid is a foreign key pointing to the netid in the User class.
class Photographers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    photographer_netid = db.Column(db.String, db.ForeignKey('users.netid'))
    first_name = db.Column(db.String(64), index=True)
    last_name = db.Column(db.String(64), index=True)
    email = db.Column(db.String(120), index=True, unique=True)
    description = db.Column(db.String(300), index=True)

    def __repr__(self):
        return '<Photographers {} {}>'.format(self.first_name, self.last_name)

# This defines the columns and data types of the User table.
class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    netid = db.Column(db.String(64), index=True, unique=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    
    def __repr__(self):
        return '<Users{}>'.format(self.netid)

# This defines the columns and data types of the Reviews table.
class Reviews(db.Model):
    netid = db.Column(db.String(80), primary_key = True)
    photographer_netid = db.Column(db.String(80))
    description = db.Column(db.String(255))
    rating = db.Column(db.Integer)

    def __repr__(self):
        return 'Reviews {} {}>'.format(self.netid, self.photographer_netid)


