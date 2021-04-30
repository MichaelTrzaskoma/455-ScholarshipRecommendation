from pymongo import MongoClient
import datetime
import jwt
import time

db = MongoClient("mongodb://localhost:27017/")
testDB = db.test
usr_profile = testDB.client_profile

# cursor = usr_profile.find_one(
#     {"email": "hchen98x@gmail.com"}, {"_id": 0, "email": 1, "jwt": 1})

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

def getUsrProfile(profileRef, email):
    r = profileRef.find_one({"_id": email})
    return r

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

def encode_jwt2(unique_id, timer, secret):
    return jwt.encode({"id": unique_id, "exp": datetime.datetime.utcnow() + datetime.timedelta(seconds=timer)}, secret, algorithm="HS256")

def decode_jwt2(code, key):
    return jwt.decode(code, key, algorithms="HS256")

try:
    # ================== TEST ================== 
    # secret = "fewgewg-gwgwe-fweafa-awfewfwe-wfef"
    # uuid = "sfef-wefweg-wetwe-wsgeg-wsgeg-ewgwe"
    # timer = int(time.mktime((datetime.datetime.utcnow() + datetime.timedelta(seconds=5)).timetuple()))
    # print(f"Timer: {timer}")

    # code = encode_jwt2(uuid, 10, secret)
    # print(f"UUID: {uuid}")
    # print(f"Secret Key: {secret}")
    # print(f"JWT code: {code}")
    # print(datetime.datetime.utcnow() + datetime.timedelta(seconds=10))

    # time.sleep(12)

    # print(datetime.datetime.utcnow() + datetime.timedelta(seconds=9))
    # decode = decode_jwt2(code, secret)
    # print(decode)
    # print("Valide token")
    # print(int(time.mktime(datetime.datetime.now().timetuple())))
    # if decode['exp'] > timer:
    #     print("expired token")
    # else:
    #     print("valid token")
    # ================== TEST ================== 

    JWT = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImV3ZndlZmV3ZmUiLCJleHAiOjE2MjAxODY0ODZ9.OOIRvJIrwP0k8PreZ4A44HL71XDoxPw7lrNscEbBhJE"
    UUID = "ewfwefewfe"
    EMAIL = "hchen98x@gmail.com"
    user_profile = getUsrProfile(usr_profile, EMAIL)
    if "devices" not in user_profile:
        print(0)
    
    device_list = user_profile["devices"]
    device_info = list(filter(lambda device: device['unique_id'] == UUID, device_list))
    if len(device_info) != 1:
        print(1)
    
    db_record_jwt = device_info[0]["jwt"]
    db_record_uuid = device_info[0]["unique_id"]
    db_record_token = device_info[0]["token"]
    db_record_time = device_info[0]["expireDate"]

    if not JWT == db_record_jwt:
        print(2)
    
    if not UUID == db_record_uuid:
        print(3)
    
    decode = decode_jwt2(JWT, db_record_token)
    print(f"Decode JWT: {decode}")
    print(f"DB record time: {db_record_time}")

    if not decode["exp"] == db_record_time:
        print(4)
    
    current_time = int(time.mktime(datetime.datetime.utcnow().timetuple()))
    if decode["exp"] > current_time:
        # e.g. JWT expires April 07, 2021 and current time is APril 01, 2021
        # therefore this is valid jwt code
        print("This is valid JWT code!")



except jwt.exceptions.ExpiredSignatureError:
    # raise an exception if the token is expired
    print("Expired token")
except jwt.exceptions.InvalidSignatureError:
    # invalid signature
    print("Invalid signature")
except jwt.exceptions.InvalidTokenError:
    print("Invalid token")
