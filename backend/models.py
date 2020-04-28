from backend import db
from datetime import datetime

# This defines the columns and data types of the User table.
class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    netid = db.Column(db.String(64), index=True, unique=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.now)
    
    def __repr__(self):
        return '<Users{}>'.format(self.netid)

# This defines the columns and data types of the Photographer table. 
# Note that photographer_netid is a foreign key pointing to the netid in the User class.
class Photographers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    photographer_netid = db.Column(db.String, index=True, unique=True)
    first_name = db.Column(db.String(64))
    last_name = db.Column(db.String(64))
    email = db.Column(db.String(120))
    website_url = db.Column(db.String(120))
    description = db.Column(db.String(1000))
    photography_checkbox = db.Column(db.Boolean, index=True)
    videography_checkbox = db.Column(db.Boolean, index=True)
    editing_checkbox = db.Column(db.Boolean, index=True)
    equipment = db.Column(db.String(250))
    profile_pic = db.Column(db.String(255), index=True)
    key = db.Column(db.String(255), index=True)
    avg_rating = db.Column(db.Integer)

    def __repr__(self):
        return '<Photographers {} {}>'.format(self.first_name, self.last_name)

# This defines the columns and data types of the Reviews table.
class Reviews(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_netid = db.Column(db.String(80), db.ForeignKey('users.netid'), index=True)
    photographer_netid = db.Column(db.String(80), db.ForeignKey('photographers.photographer_netid'), index=True)
    review = db.Column(db.String(750))
    rating = db.Column(db.Integer)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.now)

    def __repr__(self):
        return 'Reviews {} {}>'.format(self.netid, self.photographer_netid)

class Feed(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    netid = db.Column(db.String(80), db.ForeignKey('users.netid'), index=True)
    description = db.Column(db.String(750))
    subject_line = db.Column(db.String(100))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.now)
    specialty = db.Column(db.String(100))
    email = db.Column(db.String(80))

    def __repr__(self):
        return 'Feed {} {}>'.format(self.netid, self.subject_line)

# This defines the columns and data types of the Portfolio table
class Portfolio(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    netid = db.Column(db.String(80), db.ForeignKey('photographers.photographer_netid'), index=True)
    picture = db.Column(db.String(255), index=True)
    key = db.Column(db.String(255), index=True)

    def __repr__(self):
        return 'Portfolio {} {}>'.format(self.netid, self.picture)




