# auth file for the backend

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

