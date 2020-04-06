from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__,
            static_url_path='/TigerPhotos/',
            static_folder='frontend/build')
app.config.from_object(Config)

# db is a variable for our PostgreSQL database
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from backend import models, routes
