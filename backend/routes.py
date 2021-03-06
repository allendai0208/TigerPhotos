from flask import jsonify, request, render_template
from backend import app, db
from backend.models import Reviews, Users, Photographers, Feed, Portfolio
from CASClient import CASClient
from flask_mail import Mail, Message
from datetime import datetime

app.config.update(
	DEBUG=True,
	#EMAIL SETTINGS
	MAIL_SERVER='smtp.gmail.com',
	MAIL_PORT=465,
	MAIL_USE_SSL=True,
	MAIL_USERNAME = 'tigerphotosteam@gmail.com',
	MAIL_PASSWORD = 'hello1234bye'
	)
mail = Mail(app)

# This serves static files to the frontend. It is necessary in deployment. 
# Index.html is found in frontend/build
@app.route('/')
@app.route('/browse')
@app.route('/create')
@app.route('/about')
@app.route('/logout')
@app.route('/feed')
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

    print('Netid:',username)
    if (username is not None):
        # Now username is supposed to be the user's netid, or None if they are not authenticated
        username = username.strip('\n')
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
                'rating' : row.rating,
                'date' : str(row.timestamp).split(' ')[0]
            })

        photographers.append({
            'photographer_netid' : photographer.photographer_netid,
            'first_name' : photographer.first_name,
            'last_name' : photographer.last_name,
            'email' : photographer.email,
            'description' : photographer.description,
            'website_url' : photographer.website_url,
            'equipment' : photographer.equipment,
            'profile_pic' : photographer.profile_pic,
            'urls' : urls,
            'reviews' : reviews,
            'average_rating' : float(photographer.avg_rating),
            'photography_exp': photographer.photography_checkbox,
            'editing_exp': photographer.editing_checkbox,
            'videography_exp': photographer.videography_checkbox 
        })

        print("fetched avg rating:", float(photographer.avg_rating))

    return jsonify({'photographers':photographers})

@app.route('/api/deleteProfile', methods=['POST'])
def deleteProfile():
    info = request.get_json(force=True)
    netid = info['netid']

    Reviews.query.filter_by(photographer_netid = netid).delete()
    db.session.commit()
    Photographers.query.filter_by(photographer_netid = netid).delete()
    db.session.commit()
    Portfolio.query.filter_by(netid = netid).delete()
    db.session.commit()
    
    return 'Done', 201

# route that sends a JSON of a specific photographer to frontend (given a first name)
@app.route('/api/getPhotographer', methods=['POST'])
def getPhotographer():  

    photographer_info = request.get_json(force=True)
    photographer_netid = photographer_info['photographer_netid']

    # Retrieves the photographer's info from the database based on their netid
    photographer_data = Photographers.query.filter_by(photographer_netid = photographer_netid).all()
    photographer = {}

    portfolio_list = Portfolio.query.filter_by(netid = photographer_netid).all()
    portfolio = []

    for picture in portfolio_list:
        portfolio.append({
            'netid': photographer_netid,
            'url': picture.picture,
            'key': picture.key
        })    

    if len(photographer_data) != 0:
        photographer = {
                'photographer_netid': photographer_data[0].photographer_netid,
                'first_name': photographer_data[0].first_name, 
                'last_name': photographer_data[0].last_name,
                'email': photographer_data[0].email,
                'description': photographer_data[0].description,
                'photography_checkbox':  bool(photographer_data[0].photography_checkbox),
                'videography_checkbox': bool(photographer_data[0].videography_checkbox),
                'editing_checkbox': bool(photographer_data[0].editing_checkbox),
                'notif_checkbox': bool(photographer_data[0].notif_checkbox),
                'website_url': photographer_data[0].website_url,
                'equipment': photographer_data[0].equipment,
                'profile_pic': photographer_data[0].profile_pic,
                'key': photographer_data[0].key,
                'portfolio': portfolio,
                'avg_rating': float(photographer_data[0].avg_rating)
        }
        print("fetched avg rating:", float(photographer_data[0].avg_rating))
    elif len(portfolio_list) != 0:
        photographer = {
                'photographer_netid': "",
                'first_name': "", 
                'last_name': "",
                'email': "",
                'description': "",
                'photography_checkbox':  False,
                'videography_checkbox': False,
                'editing_checkbox': False,
                'notif_checkbox': False,
                'website_url': "",
                'equipment': "",
                'profile_pic': "",
                'key': "",
                'portfolio': portfolio
        }
    
    else:
        photographer = {
                'photographer_netid': "",
                'first_name': "", 
                'last_name': "",
                'email': "",
                'description': "",
                'photography_checkbox': False,
                'videography_checkbox': False,
                'editing_checkbox': False,
                'notif_checkbox': False,
                'equipment': "",
                'profile_pic': "",
                'website_url': "",
                'key': "",
                'portfolio': []
        }

    return jsonify(photographer)
    
# route that creates a profile and adds it to the database (given the photographer data)
@app.route('/api/createProfile', methods=['POST'])
def createProfile():

    photographer_data = request.get_json()
    netid = photographer_data['photographer_netid']

    photographer = Photographers.query.filter_by(photographer_netid = netid).first()

    # adds to database if netid doesn't exist
    if photographer is None:
        new_photographer = Photographers(
        photographer_netid = photographer_data['photographer_netid'],
        first_name=photographer_data['first_name'], 
        last_name=photographer_data['last_name'],
        email=photographer_data['email'],
        website_url=photographer_data['website_url'],
        description=photographer_data['description'],
        photography_checkbox=photographer_data['photography_checkbox'],
        videography_checkbox=photographer_data['videography_checkbox'],
        editing_checkbox=photographer_data['editing_checkbox'],
        notif_checkbox=photographer_data['notif_checkbox'],
        equipment=photographer_data['equipment'],
        profile_pic = photographer_data['profile_pic'],
        key = photographer_data['key'],
        avg_rating = -1
        )
        db.session.add(new_photographer)
        db.session.commit()

        return 'Done', 201
    
    # modifies existing entries
    else:
        photographer.first_name = photographer_data['first_name']
        photographer.last_name = photographer_data['last_name']
        photographer.email = photographer_data['email']
        photographer.website_url = photographer_data['website_url']
        photographer.description = photographer_data['description']
        photographer.photography_checkbox = photographer_data['photography_checkbox']
        photographer.videography_checkbox = photographer_data['videography_checkbox']
        photographer.editing_checkbox = photographer_data['editing_checkbox']
        photographer.notif_checkbox = photographer_data['notif_checkbox']
        photographer.equipment = photographer_data['equipment']
        photographer.profile_pic = photographer_data['profile_pic']
        photographer.key = photographer_data['key']

        db.session.commit()

        return 'Done', 201


# route that retrieves the portfolio of the photographer (given their netid)
@app.route('/api/getPortfolio')
def getPortfolio():

    portfolio_info = request.get_json(force=True)
    photographer_netid = portfolio_info['photographer_netid']

    portfolio_list = Portfolio.query.filter_by(netid = photographer_netid).all()
    portfolio = []

    for picture in portfolio_list:
        portfolio.append({
            'picture': picture.picture,
            'key': picture.key
        })
    return jsonify({'portfolio':portfolio})

# Adds the uploaded portfolio to the database under the user's (photographer's) netid
@app.route('/api/createPortfolio', methods=['POST'])
def createPortfolio():

    portfolio_data = request.get_json()
    netid = portfolio_data["netid"]

    photographer_portfolio = Portfolio.query.filter_by(netid = netid).all()

    if photographer_portfolio is not None:
        for row in photographer_portfolio:
            db.session.delete(row)
            db.session.commit()

    for row in portfolio_data["portfolio"]:

        new_picture = Portfolio(netid=netid, picture=row['url'], key=row['key'])

        db.session.add(new_picture)
        db.session.commit()
        
    return 'Done', 201

# route that creates a review and adds it to the database (given review data)
@app.route('/api/createReview', methods=['POST'])
def createReview():

    review_info = request.get_json(force=True)

    # If the user already has a review for this photographer, delete the old review
    review_exists = Reviews.query.filter_by(user_netid=review_info['user_netid'],
                                            photographer_netid=review_info['photographer_netid']).all()    # Used as a bool
    if len(review_exists) != 0:
        Reviews.query.filter_by(user_netid=review_info['user_netid'], photographer_netid=review_info['photographer_netid']).delete()    # Delete the old review

    new_review = Reviews(user_netid=review_info['user_netid'], 
                         photographer_netid=review_info['photographer_netid'], 
                         review=review_info['review'], 
                         rating=review_info['rating'])

    current_reviews = Reviews.query.filter_by(photographer_netid = review_info['photographer_netid']).all()
    
    total_rating = float(review_info['rating'])

    if total_rating == -1:
        total_rating = 0

    num_rating = 1

    for review in current_reviews:
        total_rating += float(review.rating)
        num_rating += 1

    avg_rating = total_rating / num_rating
    print("computed avg rating:", avg_rating)

    photographer = Photographers.query.filter_by(photographer_netid = review_info['photographer_netid']).first()
    photographer.avg_rating = avg_rating
    print("line 338:", photographer.avg_rating)

    db.session.add(new_review)
    db.session.commit()
        
    return 'Done', 201

@app.route('/api/deleteReview', methods=['POST'])
def deleteReview():

    review_info = request.get_json(force=True)

    current_reviews = Reviews.query.filter_by(photographer_netid = review_info['photographer_netid']).all()

    total_rating = 0
    num_rating = 0

    for review in current_reviews:
        total_rating += review.rating
        num_rating += 1

    total_rating = float(total_rating - review_info['rating'])
    num_rating = num_rating - 1

    if num_rating == 0:
        avg_rating = -1
    else:
        avg_rating = total_rating / num_rating

    print("computed avg rating:", avg_rating)

    photographer = Photographers.query.filter_by(photographer_netid = review_info['photographer_netid']).first()
    photographer.avg_rating = avg_rating

    Reviews.query.filter_by(user_netid=review_info['user_netid'],
                            photographer_netid=review_info['photographer_netid']).delete()

    db.session.commit()

    return 'Done', 201                   

@app.route('/api/sendEmail', methods=['POST'])
def sendEmail():
    emailInfo = request.get_json()

    try:
        msg = Message(emailInfo["email_subject"], sender = "tigerphotosteam@gmail.com", recipients = [emailInfo["email_sendTo"]])
        msg.body = emailInfo["email_body"]
        msg.html = render_template('contact1P.html', body=emailInfo['email_body'], clientEmail=emailInfo['email_toContact'])
        mail.send(msg)
    except Exception as e:
        return (str(e))

    return 'Done', 203


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

# route that adds image of a given photographer (given their netid and filename)
@app.route('/api/addImage', methods=['POST'])
def addImage():

    image_info = request.get_json(force=True)

    new_image = Portfolio(netid = image_info['netid'],
                          picture = image_info['url'],
                          key = image_info['key'])
    
    db.session.add(new_image)
    db.session.commit()

    return 'Done', 201

@app.route('/api/deleteImage', methods=['POST'])
def deleteImage():

    image_info = request.get_json(force=True)

    Portfolio.query.filter_by(netid = image_info['netid'], key = image_info['key']).delete()

    db.session.commit()

    return 'Done', 201

# route that retrieves all the posts submitted
@app.route('/api/getPosts')
def getPosts():

    post_list = Feed.query.all()
    posts = []

    today = datetime.today()
    for post in post_list:
        duration = today - post.timestamp
        if (duration.days <= 90):
            posts.append({
                'netid': post.netid,
                'description': post.description,
                'subject_line': post.subject_line,
                'sorting_timestamp': post.timestamp, # only used to sort by newest/oldest 
                'timestamp': str(post.timestamp).split(' ')[0],
                'specialty': post.specialty,
                'email': post.email
            })
        # This actually deletes the old rows from the database
        #else: 
            #Feed.query.filter_by(id = post.id).delete()
    
    return jsonify({'posts':posts})

@app.route('/api/createPost', methods=['POST'])
def createPost():
    mesg = []
    post_info = request.get_json(force=True)

    post = Feed(
        netid = post_info['netid'],
        description = post_info['description'],
        subject_line = post_info['subject_line'],
        specialty = post_info['specialty'],
        email = post_info['email']
    )

    db.session.add(post)
    db.session.commit()

    if post_info['specialty'] == 'photographers':
        msgz = Photographers.query.filter_by(photography_checkbox = True, notif_checkbox = True).all()
        for tst in msgz:
            mesg.append(tst.email)
    elif post_info['specialty'] == 'videographers':
        msgz = Photographers.query.filter_by(videography_checkbox = True, notif_checkbox = True).all()
        for tst in msgz:
            mesg.append(tst.email)
    elif post_info['specialty'] == 'editors':
        msgz = Photographers.query.filter_by(editing_checkbox = True, notif_checkbox = True).all()
        for tst in msgz:
            mesg.append(tst.email)    

    if (len(mesg) != 0):
        try:
            msg = Message(post_info['subject_line'], sender = "tigerphotosteam@gmail.com", recipients = mesg)
            msg.body = post_info['subject_line']
            msg.html = render_template('contact1P.html', body=post_info['description'], clientEmail=post_info['email'])
            mail.send(msg)
        except Exception as e:
            print(str(e))
            return (str(e))

    return 'Done', 201

@app.route('/api/deletePost', methods=['POST'])
def deletePost():

    post_info = request.get_json(force=True)

    netid = post_info['netid']
    description = post_info['description']
    subject_line = post_info['subject_line']
    specialty = post_info['specialty']
    email = post_info['email']

    Feed.query.filter_by(
        netid = netid, 
        description = description,
        subject_line = subject_line,
        specialty = specialty,
        email = email).delete()

    db.session.commit()

    return 'Done', 201
