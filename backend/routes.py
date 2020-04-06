from flask import jsonify, request
from backend import app, db
from backend.models import Reviews, Users, Photographers

@app.route('/')
def root():
    return app.send_static_file('index.html')

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