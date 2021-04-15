from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
testDB = client.test

profile_collection = testDB.auth
insert_r = profile_collection.insert_one({
    "email": "place holder 1",
    "paswrd": "place holder 2",
    "jwt": "place holder 3",
    "recent_viewed": [
        {
            "type": "scholarship",
            "title": "place holder 4",
        },
        {
            "type": "college",
            "title": "place holder 5",
        },
        {
            "type": "major",
            "title": "place holder 6",
        },
    ],
    "bookmarks": [
        {
            "type": "scholarship",
            "title": "place holder 7",
        },
        {
            "type": "college",
            "title": "place holder 8",
        },
        {
            "type": "major",
            "title": "place holder 9",
        },
    ],
    "survey_scholarship": {
        "gender": 12,
        "dob": "mm-dd-yyyy",
        "zip": 12345,
        "gpa": 3.9,
        "major": "place holder 10",
        "race": "place holder 11",
        "ethnicity": "place holder 12",
        "religion": "place holder 13",
        "disabilities": "place holder 14",
        "sat_score": "place holder 15",
    },
    "survey_college": {
        "x": "place holder 16",
    },
    "survey_major": {
        "y": "place holder 17",
    },
})

usrProfile_collection = testDB.auth
docs = usrProfile_collection.find_one({})

print("UsrProfile doc: ")
print(docs)