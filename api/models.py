from api import db

class Reviews(db.Model):
    netid = db.Column(db.String(80), primary_key = True)
    photographer_netid = db.Column(db.String(80))
    description = db.Column(db.String(255))
    rating = db.Column(db.Integer)

    def __repr__(self):
        return 'Reviews {} {}>'.format(self.netid, self.photographer_netid)