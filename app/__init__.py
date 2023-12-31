from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

import config

# Declare db, mighrate variables as global to make them accessible from other modules
db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.debug = True
    app.config.from_object(config)

    # Set up for Object-Relational Mapping
    db.init_app(app)
    migrate.init_app(app, db)
    from . import models

    from .views import main
    app.register_blueprint(main.bp)

    return app