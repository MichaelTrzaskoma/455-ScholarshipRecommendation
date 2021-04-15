import jwt
from pymongo import MongoClient

db = MongoClient("mongodb://localhost:27017/")

user_Ref = db.test.client_profile

r = user_Ref.count_documents({"sssss": "2353252"})

print(r)
