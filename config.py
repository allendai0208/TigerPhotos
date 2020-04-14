import os

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or b'\xcdt\x8dn\xe1\xbdW\x9d[}yJ\xfc\xa3~/'
    
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///database.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    LOG_TO_STDOUT = os.environ.get('LOG_TO_STDOUT')
    