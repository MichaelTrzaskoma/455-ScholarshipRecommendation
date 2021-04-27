from pymongo import MongoClient
import datetime
import jwt
import time

db = MongoClient("mongodb://localhost:27017/")
testDB = db.test
usr_profile = testDB.client_profile

cursor = usr_profile.find_one(
    {"email": "hchen98x@gmail.com"}, {"_id": 0, "email": 1, "jwt": 1})

# for item in cursor:
#     print(item)

# print(cursor)
# print(type(cursor))

def initial_device(profileDB, email, jwt_code, uuid, token, dt):
    # initialize the jwt attribute in the client_profile collection
    # INPUT
    # :profileDB (cursor) db connection
    # :email (str) clien't email
    # :jwt_code (str) unique jwt for the device for auth system
    # :uuid (str) unique device id
    # :token (str) unique random string for each login
    # :timestamp (datetime) time stamp of current token
    data = {
        "jwt": jwt_code,
        "unique_id": uuid,
        "token": token,
        "activateDate": dt
    }
    # mongodb will create this devices array if it doesn't exist in db
    profileDB.update({"email": email}, {'$push': {'devices': data}})


# initial_device(usr_profile, "hchen98x@gmail.com", "defwefwefwe", "fwert43t23wr32t", "f43t43tagetg", "d3r3r4")


def encode_jwt(unique_id, expire_day, secret):
    # generate jwt to the user
    # REQUIREMENT - a registered user
    # INPUT
    # :unique_id (str) UUID of the device
    # :expire_day (int) when the jwt will be expired
    # :secret (str) a unique token for the user that valid for 7 days
    # OUTPUT: return a jwt code
    return jwt.encode({"id": unique_id, "exp": datetime.datetime.now() + datetime.timedelta(days=expire_day)}, secret, algorithm="HS256")

# initial_device(usr_profile,
#                "hchen98x@gmail.com",
#                "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbmZvIjoic2Fzc3kgd2FzIGhlcmUifQ.1iTArWpm775wGlKHOMQFgIKgU7J0iYT79871x8qp9y0",
#                "sfef-wefweg-wetwe-wsgeg-wsgeg-ewgwe",
#                "fewgewg-gwgwe-fweafa-awfewfwe-wfef",
#                datetime.datetime.now())

def decode_jwt(code, key):
    # decode jwt code
    # INPUT
    # :code (str) the jwt code
    # :key (str) the secret key that associate to the jwt
    # OUTPUT: return a decoded jwt content
    return jwt.decode(code, key, algorithms="HS256")

# code = encode_jwt("sfef-wefweg-wetwe-wsgeg-wsgeg-ewgwe", 7, "fewgewg-gwgwe-fweafa-awfewfwe-wfef")
# print("sfef-wefweg-wetwe-wsgeg-wsgeg-ewgwe")
# print(decode_jwt(code, "fewgewg-gwgwe-fweafa-awfewfwe-wfef", 7))



# jwt expiration test with seconds

def encode_jwt2(unique_id, timer, secret):
    return jwt.encode({"id": unique_id, "exp": datetime.datetime.now() + datetime.timedelta(seconds=timer)}, secret, algorithm="HS256")

def decode_jwt(code, key):
    return jwt.decode(code, key, algorithms="HS256")


# code = encode_jwt("sfef-wefweg-wetwe-wsgeg-wsgeg-ewgwe", 3, "fewgewg-gwgwe-fweafa-awfewfwe-wfef")
# print("sfef-wefweg-wetwe-wsgeg-wsgeg-ewgwe")

# time.sleep(7)

# decode = decode_jwt(code, "fewgewg-gwgwe-fweafa-awfewfwe-wfef")
# print(decode)

# # current time in int format
# timer = int(time.mktime(datetime.datetime.now().timetuple()))
# print(timer)

# if decode['exp'] > timer:
#     print("expired token")
# else:
#     print("valid token")




# r = usr_profile.find_one({"email": "hchen98x@gmail.com"}, {"_id": 0, "devices": 1})
# x = list(filter(lambda r: r['token'] == 'f43t43tagetg', r["devices"]))
# print(len(x))


# Existing info:
# {'jwt': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbmZvIjoic2Fzc3kgd2FzIGhlcmUifQ.1iTArWpm775wGlKHOMQFgIKgU7J0iYT79871x8qp9y0', 'unique_id': 'sfef-wefweg-wetwe-wsgeg-wsgeg-ewgwe', 'token': 'fewgewg-gwgwe-fweafa-awfewfwe-wfef', 'activateDate': datetime.datetime(2021, 4, 26, 19, 29, 44, 729000)}
# {'jwt': 'defwefwefwe', 'unique_id': 'fwert43t23wr32t', 'token': 'f43t43tagetg', 'activateDate': 'd3r3r4'}

# usr_profile.update_one({"email": "hchen98x@gmail.com", "devices.unique_id": "new id"}, {"$set": {"devices.$": {
#     "jwt": "defwefwefwe",
#     "unique_id": "fwert43t23wr32t",
#     "token": "f43t43tagetg",
#     "activateDate": "d3r3r4"
# }}})
