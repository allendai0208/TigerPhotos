from flask import Flask, jsonify, request
from datetime import datetime
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

class Reviews(db.Model):
    netid = db.Column(db.String(80), primary_key = True)
    photographer_netid = db.Column(db.String(80))
    description = db.Column(db.String(255))
    rating = db.Column(db.Integer)

    def __repr__(self):
        return 'Reviews {} {}>'.format(self.netid, self.photographer_netid)

# Routes

@app.route('/')
@app.route('/api/index')
def index():
    return 'Done', 201

@app.route('/api/browse')
def browse():
    photographer_list = Photographers.query.all()
    photographers = []

    for photographer in photographer_list:
        photographers.append({
            'first_name': photographer.first_name,
            'last_name': photographer.last_name,
            'email': photographer.email,
            'description': photographer.description
        })                                       
    return jsonify({'photographers':photographers})

@app.route('/api/createProfile', methods=['POST'])
def createProfile():
    photographer_data =  request.get_json()
    new_photographer = Photographers(first_name=photographer_data['first_name'], 
                                     last_name=photographer_data['last_name'],
                                     email=photographer_data['email'],
                                     description=photographer_data['description'])

    db.session.add(new_photographer)
    db.session.commit()

    return 'Done', 201

'''
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
'''
