from backend import db
from datetime import datetime

# This defines the columns and data types of the User table.
class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    netid = db.Column(db.String(255), index=True, unique=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.now)
    
    def __repr__(self):
        return '<Users{}>'.format(self.netid)

# This defines the columns and data types of the Photographer table. 
# Note that photographer_netid is a foreign key pointing to the netid in the User class.
class Photographers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    photographer_netid = db.Column(db.String, index=True, unique=True)
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    email = db.Column(db.String(255))
    website_url = db.Column(db.String(256))
    description = db.Column(db.String(2000))
    photography_checkbox = db.Column(db.Boolean, index=True)
    videography_checkbox = db.Column(db.Boolean, index=True)
    editing_checkbox = db.Column(db.Boolean, index=True)
    notif_checkbox = db.Column(db.Boolean, index=True)
    equipment = db.Column(db.String(500))
    profile_pic = db.Column(db.String(255))
    key = db.Column(db.String(255))
    avg_rating = db.Column(db.Numeric(3,5))
    #avg_rating = db.Column(db.Float(precision=5,asdecimal=True,decimal_return_scale=None))

    def __repr__(self):
        return '<Photographers {} {}>'.format(self.first_name, self.last_name)

# This defines the columns and data types of the Reviews table.
class Reviews(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_netid = db.Column(db.String(255), db.ForeignKey('users.netid'), index=True)
    photographer_netid = db.Column(db.String(255), db.ForeignKey('photographers.photographer_netid'), index=True)
    review = db.Column(db.String(750))
    rating = db.Column(db.Numeric(3,5))
    #rating = db.Column(db.Float(precision=5,asdecimal=True,decimal_return_scale=None))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.now)

    def __repr__(self):
        return 'Reviews {} {}>'.format(self.netid, self.photographer_netid)

class Feed(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    netid = db.Column(db.String(255), db.ForeignKey('users.netid'), index=True)
    description = db.Column(db.String(1000))
    subject_line = db.Column(db.String(100))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.now)
    specialty = db.Column(db.String(100))
    email = db.Column(db.String(255))

    def __repr__(self):
        return 'Feed {} {}>'.format(self.netid, self.subject_line)

# This defines the columns and data types of the Portfolio table
class Portfolio(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    netid = db.Column(db.String(255), index=True)
    picture = db.Column(db.String(255), index=True)
    key = db.Column(db.String(255))

    def __repr__(self):
        return 'Portfolio {} {}>'.format(self.netid, self.picture)




