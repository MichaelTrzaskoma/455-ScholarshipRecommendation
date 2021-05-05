# auth file for the backend
from flask.globals import request
import jwt
import datetime
import string
import random
import time

ACTIVE_CODE_LENGTH = 64


def generateCode():
    # generate token for the user
    code = ""
    for i in range(ACTIVE_CODE_LENGTH):
        code += random.choice(string.ascii_letters + string.digits)
    return code


def init_usrProfileDB(user_Ref, email, password, activate_code, activate_date, activate_status):
    # init user profile database
    user_Ref.insert_one({
        "_id": email,
        "paswrd": password,
        "active": activate_status,
        "activationCode": activate_code,
        "activationDate": activate_date,
    })


def initial_device(profileDB, email, jwt_code, uuid, token, timer):
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
        "expireDate": timer
        # "expireDate": int(time.mktime(datetime.datetime.utcnow() + datetime.timedelta(days=7)).timetuple())
    }
    # mongodb will create this devices array if it doesn't exist in db
    profileDB.update({"_id": email}, {'$push': {'devices': data}})


def check_email_verification_status(user_Ref, email):
    # check email verification status
    # REQUIREMENT: a registed user and haven't verified his/her email yet
    # INPUT
    # :user_Ref (db obj) connection to user profile db
    # :email (string) user's email
    # OUTPUT: return TRUE if the email is verified, otherwise FALSE
    result = user_Ref.find_one({"_id": email}, {"_id": 0, "active": 1})

    return True if result.get("active") == 1 else False


def encode_jwt(unique_id, timer, expire_day, secret):
    # generate jwt to the user
    # a time stamp of expiration timestamp (UTC) is generated during this process
    # REQUIREMENT - a registered user
    # INPUT
    # :unique_id (str) UUID of the device
    # :expire_day (int) when the jwt will be expired
    # :secret (str) a unique token for the user that valid for 7 days
    # OUTPUT: return a jwt code
    return jwt.encode({"id": unique_id, "exp": timer}, secret, algorithm="HS256")


def decode_jwt(code, key):
    # decode jwt code
    # INPUT
    # :code (str) the jwt code
    # :key (str) the secret key that associate to the jwt
    # OUTPUT: return a decoded jwt content
    try:
        return jwt.decode(code, key, algorithms="HS256")
    except jwt.exceptions.ExpiredSignatureError:
        # raise an exception if the token is expired
        return 0
    except jwt.exceptions.InvalidSignatureError:
        # invalid signature
        return 1
    except jwt.exceptions.InvalidTokenError:
        return 2


# def expiredJWT(decode_timer, current_timer):
#     # validate the JWT expiration time stamp
#     # INPUT
#     # :decode_timer (int) jwt expire time stamp
#     # :current_timer (int) current time stamp
#     # OUTPUT: return boolean for valid time stamp
#     return True if decode_timer > current_timer else False


def update_deviceInfo(profileRef, email, exisiting_id, jwt, uuid, token, timer):
    # update a single device info
    # REQUIREMENT - a registered user and existing uuid
    # INPUT
    # :email (str) user's email
    # :exisiting_id (str) existing uuid
    # :jwt (str) the new jwt code
    # :uuid (str) the new device unique id
    # :token (str) the new token for that device
    # :timestap (time obj) time this device is assigned with new token

    # a "$" is uesed in "devices" since we don't know the exact place of the new info inside the arr
    profileRef.update_one({"email": email, "devices.unique_id": exisiting_id},
                          {"$set": {
                              "devices.$": {
                                  "jwt": jwt,
                                  "unique_id": uuid,
                                  "token": token,
                                  "expireDate": timer
                              }
                          }})


def validate_access_token(profileRefDB, jwt, uuid, email):
    # validate the user's access token (jwt)
    # this func is used whenever the incoming request from the user is received
    r = profileRefDB.find_one({"_id": email})

    if "devices" not in r:
        return 0
    
    device_list = r["devices"]
    device_info = list(filter(lambda device: device['unique_id'] == uuid, device_list))
    if len(device_info) != 1:
        return 1
    
    db_record_jwt = device_info[0]["jwt"]
    db_record_uuid = device_info[0]["unique_id"]
    db_record_token = device_info[0]["token"]
    db_record_time = device_info[0]["expireDate"]

    if not jwt == db_record_jwt:
        return 2
    
    if not uuid == db_record_uuid:
        return 3
    
    errors = [0, 1, 2]
    decode = decode_jwt(jwt, db_record_token)

    if decode not in errors:
        if not decode["exp"] == db_record_time:
            return 4
        
        current_time = int(time.mktime(datetime.datetime.utcnow().timetuple()))
        if decode["exp"] > current_time:
            # e.g. JWT expires April 07, 2021 and current time is APril 01, 2021
            # therefore this is valid jwt code
            return True
    else:
        return 5


def validate_token(user_Ref, jwt, uuid, email):

    errors = [0, 1, 2, 3, 4, 5]
    r = validate_access_token(user_Ref, jwt, uuid, email)
    # print(r)
    if r:
        return True
    else:
        return False


def validate_email(client_ref, email):
    return True if client_ref.count_documents({"_id": email}) == 1 else False