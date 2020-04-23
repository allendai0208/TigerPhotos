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
    first_name = db.Column(db.String(64), index=True)
    last_name = db.Column(db.String(64), index=True)
    email = db.Column(db.String(120), index=True)
    description = db.Column(db.String(300), index=True)
    profile_pic = db.Column(db.String(255), index=True)
    key = db.Column(db.String(255), index=True)

    def __repr__(self):
        return '<Photographers {} {}>'.format(self.first_name, self.last_name)

# This defines the columns and data types of the Reviews table.
class Reviews(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_netid = db.Column(db.String(80), db.ForeignKey('users.netid'), index=True)
    photographer_netid = db.Column(db.String(80), db.ForeignKey('photographers.photographer_netid'), index=True)
    review = db.Column(db.String(255), index=True)
    rating = db.Column(db.Integer, index=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.now)

    def __repr__(self):
        return 'Reviews {} {}>'.format(self.netid, self.photographer_netid)

# This defines the columns and data types of the Equipment table
class Equipment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    netid = db.Column(db.String(80), db.ForeignKey('photographers.photographer_netid'), index=True)
    equip = db.Column(db.String(80), index=True)
    
    def __repr__(self):
        return 'Equipment {} {}>'.format(self.netid, self.equip)

# This defines the columns and data types of the Expertise table
class Expertise(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    netid = db.Column(db.String(80), db.ForeignKey('photographers.photographer_netid'), index=True)
    area = db.Column(db.String(80), index=True)

    def __repr__(self):
        return 'Expertise {} {}>'.format(self.netid, self.area)

# This defines the columns and data types of the Portfolio table
class Portfolio(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    netid = db.Column(db.String(80), db.ForeignKey('photographers.photographer_netid'), index=True)
    picture = db.Column(db.String(255), index=True)
    key = db.Column(db.String(255), index=True)

    def __repr__(self):
        return 'Portfolio {} {}>'.format(self.netid, self.picture)




