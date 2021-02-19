# script to append three extra binary to the "binary" attribute

# MAKE A BACKUP BEFORE UPDATING THE DB! 

from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017')

# access db
db = client.backup

# access collection
scholarship_coll = db.scholarships

scholarship_doc = list(scholarship_coll.find())

# for i in range(len(scholarship_doc)):
#   scholarship_coll.update_one({"_id": scholarship_doc[i]["_id"]}, {"$set":{"binary": (scholarship_doc[i]["binary"] + "000")}})