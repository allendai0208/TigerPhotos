from flask import jsonify, request
from backend import app, db
from backend.models import Reviews, Users, Photographers, Equipment, Expertise, Portfolio

@app.route('/')
@app.route('/browse')
@app.route('/create')
@app.route('/about')
def root():
    return app.send_static_file('index.html')

@app.route('/api/index')
def index():
    return 'Done', 201

# route that send a JSON of all photographers to frontend
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

# route that sends a JSON of a specific photographer to frontend (given a first name)
@app.route('/api/getPhotographer', methods=['POST'])
def getPhotographer():  

    photographer_info = request.get_json(force=True)
    photographer_first_name = photographer_info['first_name']

    photographer_data = Photographers.query.filter_by(first_name = photographer_first_name).all()

    photographer = {'first_name': photographer_data[0].first_name, 'last_name': photographer_data[0].last_name,
            'email': photographer_data[0].email,
            'description': photographer_data[0].description}

    return jsonify({'photographer':photographer})
    
# route that creates a profile and adds it to the database (given the photographer data)
@app.route('/api/createProfile', methods=['POST'])
def createProfile():

    photographer_data = request.get_json()

    new_photographer = Photographers(first_name=photographer_data['first_name'], 
                                     last_name=photographer_data['last_name'],
                                     email=photographer_data['email'],
                                     description=photographer_data['description'])

    db.session.add(new_photographer)
    db.session.commit()

    return 'Done', 201

# route that retrieves the portfolio of the photographer (given their netid)
@app.route('/api/getPortfolio')
def getPorfolio():

    netid = 'ajnguyen'

    portfolio_list = Portfolio.query.filter_by(netid = netid).all()
    portfolio = []

    for picture in portfolio_list:
        portfolio.append({
            'picture': picture.picture
        })
    return jsonify({'portfolio':portfolio})

#@app.route('api/createPortfolio')
#def createPortfolio():

    

# route that creates a review and adds it to the database (given review data)
@app.route('/api/createReview', methods=['POST'])
def createReview():

    review_data = request.get_json()

    new_review = Reviews(netid=review_data['netid'], photographer_netid=review_data['photographer_netid'], description=review_data['description'], rating=review_data['rating'])

    db.session.add(new_review)
    db.session.commit()
        
    return 'Done', 201

# route that retrieves the reviews of a given photographer (given their netid)
@app.route('/api/getReviews')
def getReviews():

    netid = request.get_json(force=True)
    review_list = Reviews.query.fliter_by(photographer_netid = netid).all()
    reviews = []

    for review in review_list:
        reviews.append({
            'netid': review.netid,
            'photographer_netid': review.photographer_netid,
            'description': review.description,
            'rating': review.rating
        })                                       
    return jsonify({'reviews':reviews})
