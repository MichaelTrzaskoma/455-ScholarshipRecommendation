from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
testDB = client.test

profile_collection = testDB.client_profile
usrProfile_collection = testDB.auth
# docs = usrProfile_collection.find_one({})

def append():
    insert_r = profile_collection.insert_one({
        "email": "place holder 1",
        "paswrd": "place holder 2",
        "jwt": ["place holder 3"],
        "device_id": ["efefe", "23532423"],
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
        "signUp": "date"
    })

def init_usrProfileDB(user_Ref, email, password, activate_code, activate_date, activate_status):
    # init user profile database
    user_Ref.insert_one({
        "_id": email,
        "paswrd": password,
        "actiStatus": activate_status,
        "actiCode": activate_code,
        "actiDate": activate_date,
    })

def check_email_verification_status(user_Ref, email):
    # check email verification status
    # REQUIREMENT: a registed user and haven't verified his/her email yet
    # INPUT
    # :user_Ref (db obj) connection to user profile db
    # :email (string) user's email
    # OUTPUT: return TRUE if the email is verified, otherwise FALSE
    result = user_Ref.find_one({"_id": email}, {"actiStatus": 1})

    return True if result.get("actiStatus") == 1 else False

# def check_survey_fields(user_Ref, email, survey_fields):
    # check which survey did the user has taken already


# init_usrProfileDB(profile_collection, "hchen98x@gmail.com", "dsfwefewfwefewfwe", "wefwefwefwe", "rfewfewfwefwe", 0)

# r = check_email_verification_status(profile_collection, "hchen98x@gmail.com")
# print(r)

