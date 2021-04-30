
from flask import Flask
import redis
from rq import Queue


app = Flask(__name__)

r = redis.Redis()
q = Queue(connection=r)


if app.config["ENV"] == "production":
    app.config.from_object("config.ProductionConfig")
else:
    app.config.from_object("config.DevelopmentConfig")

print(f"ENV is set to: {app.config['ENV']}")

from app import views
from app import tasks