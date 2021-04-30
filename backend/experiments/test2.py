import jwt
from pymongo import MongoClient

db = MongoClient("mongodb://localhost:27017/")

subcatlist_ref = db.test.subcatlist

r = subcatlist_ref.count_documents({"subCat": "Arthritis/Rheumatism"})

print(r)
