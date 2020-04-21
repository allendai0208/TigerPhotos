from flask import jsonify, request
from backend import app, db
from backend.models import Reviews, Users, Photographers, Equipment, Expertise, Portfolio
from CASClient import CASClient

# This serves static files to the frontend. It is necessary in deployment. 
# Index.html is found in frontend/build
@app.route('/')
@app.route('/browse')
@app.route('/create')
@app.route('/about')
@app.route('/logout')
def root():
    return app.send_static_file('index.html')

# This authenticates the user by either checking if they are in the current session or
# verifying the ticket from CAS that is contained in the url. To be used in App.js
@app.route('/api/authenticate', methods=['POST'])
def authenticate():
    url_info = request.get_json(force = True)

    # the current url from the frontend
    url = url_info['url']

    username = None
    if ('ticket' in url):
        username = CASClient().authenticate(url)
    else:
        username = CASClient().authenticate('')
    
    # Now username is supposed to be the user's netid, or None if they are not authenticated
    username = username.strip('\n')

    print('Netid:',username)
    if (username is not None):
        # If the user is not already in the database, add him/her
        user = Users.query.filter_by(netid = username).all()
        print('User:',user)
        if not user:
            new_user = Users(netid=username)
            db.session.add(new_user)
            db.session.commit()

    return jsonify({'netid':username})

@app.route('/api/login')
def login():
    # Pass the CAS login url to the frontend. To be used in LoginPage.js
    loginUrl = CASClient().login()

    return jsonify({'loginUrl':loginUrl})

@app.route('/api/logout')
def logout():
    logoutUrl = CASClient().logout()

    return jsonify({'logoutUrl':logoutUrl})

# route that send a JSON of all photographers to frontend
@app.route('/api/browse')
def browse():
    photographer_list = Photographers.query.all()
    photographers = []

    for photographer in photographer_list:
        
        # query each row in portfolio pertaining to the specific photographer
        portfolio_list = Portfolio.query.filter_by(netid = photographer.photographer_netid).all()
        urls = []

        for row in portfolio_list:
            urls.append(row.picture)

        review_list = Reviews.query.filter_by(photographer_netid = photographer.photographer_netid).all()
        reviews = []

        for row in review_list:
            reviews.append({
                'user_netid' : row.user_netid,
                'review' : row.review,
                'rating' : row.rating
            })

        photographers.append({
            'photographer_netid' : photographer.photographer_netid,
            'first_name' : photographer.first_name,
            'last_name' : photographer.last_name,
            'email' : photographer.email,
            'description' : photographer.description,
            'profile_pic' : photographer.profile_pic,
            'urls' : urls,
            'reviews' : reviews
        })                                       
    return jsonify({'photographers':photographers})


# route that sends a JSON of a specific photographer to frontend (given a first name)
@app.route('/api/getPhotographer', methods=['POST'])
def getPhotographer():  

    photographer_info = request.get_json(force=True)
    photographer_netid = photographer_info['photographer_netid']

    # Retrieves the photographer's info from the database based on their netid
    photographer_data = Photographers.query.filter_by(photographer_netid = photographer_netid).all()

    photographer = {}
    
    if len(photographer_data) != 0:
        photographer = {
                'photographer_netid': photographer_data[0].photographer_netid,
                'first_name': photographer_data[0].first_name, 
                'last_name': photographer_data[0].last_name,
                'email': photographer_data[0].email,
                'description': photographer_data[0].description,
                'profile_pic': photographer_data[0].profile_pic}

    return jsonify(photographer)
    
# route that creates a profile and adds it to the database (given the photographer data)
@app.route('/api/createProfile', methods=['POST'])
def createProfile():

    photographer_data = request.get_json()

    new_photographer = Photographers(
        photographer_netid = photographer_data['photographer_netid'],
        first_name=photographer_data['first_name'], 
        last_name=photographer_data['last_name'],
        email=photographer_data['email'],
        description=photographer_data['description'],
        profile_pic = photographer_data['profile_pic']
    )

    db.session.add(new_photographer)
    db.session.commit()

    return 'Done', 201

# route that retrieves the portfolio of the photographer (given their netid)
@app.route('/api/getPortfolio')
def getPorfolio():

    portfolio_info = request.get_json(force=True)
    photographer_netid = portfolio_info['photographer_netid']

    portfolio_list = Portfolio.query.filter_by(netid = photographer_netid).all()
    portfolio = []

    for picture in portfolio_list:
        portfolio.append({
            'picture': picture.picture
        })
    return jsonify({'portfolio':portfolio})

# Adds the uploaded portfolio to the database under the user's (photographer's) netid
@app.route('/api/createPortfolio', methods=['POST'])
def createPortfolio():

    portfolio_data = request.get_json()

    new_picture = Portfolio(netid=portfolio_data['netid'], picture=portfolio_data['url'])

    db.session.add(new_picture)
    db.session.commit()
        
    return 'Done', 201
    

# route that creates a review and adds it to the database (given review data)
@app.route('/api/createReview', methods=['POST'])
def createReview():

    review_info = request.get_json(force=True)
    print('REVIEW_INFO:',review_info)
    print('rating:',review_info['rating'])

    new_review = Reviews(user_netid=review_info['user_netid'], 
                         photographer_netid=review_info['photographer_netid'], 
                         review=review_info['review'], 
                         rating=review_info['rating'])

    db.session.add(new_review)
    db.session.commit()
        
    return 'Done', 201

# route that retrieves the reviews of a given photographer (given their netid)
@app.route('/api/getReviews')
def getReviews():

    netid = request.get_json(force=True)
    review_list = Reviews.query.filter_by(photographer_netid = netid).all()
    reviews = []

    for review in review_list:
        reviews.append({
            'netid': review.netid,
            'photographer_netid': review.photographer_netid,
            'description': review.description,
            'rating': review.rating
        })                                       
    return jsonify({'reviews':reviews})
