from flask import Flask, jsonify, request
import os
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL') or \
    'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['LOG_TO_STDOUT'] = os.environ.get('LOG_TO_STDOUT')

# db is a variable for our PostgreSQL database
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Database models
class Reviews(db.Model):
    netid = db.Column(db.String(80), primary_key = True)
    photographer_netid = db.Column(db.String(80))
    description = db.Column(db.String(255))
    rating = db.Column(db.Integer)

    def __repr__(self):
        return 'Reviews {} {}>'.format(self.netid, self.photographer_netid)

# Routes
@app.route('/api/add_review', methods=['POST'])
def add_review():

    review_data = request.get_json()

    new_review = Reviews(netid=review_data['netid'], photographer_netid=review_data['photographer_netid'], description=review_data['description'], rating=review_data['rating'])

    db.session.add(new_review)
    db.session.commit()
        
    return 'Done', 201

@app.route('/')
@app.route('/api/reviews')
def reviews():

    review_list = Reviews.query.all()
    reviews = []

    for review in review_list:
        reviews.append({
            'netid': review.netid,
            'photographer_netid': review.photographer_netid,
            'description': review.description,
            'rating': review.rating
        })                                       
    return jsonify({'reviews':reviews})

