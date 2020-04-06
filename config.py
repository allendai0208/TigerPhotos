import os

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///database.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    LOG_TO_STDOUT = os.environ.get('LOG_TO_STDOUT')
    