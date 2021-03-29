# auth file for the backend

def check_email_verification_status(user_Ref, email):
    # check email verification status
    # REQUIREMENT: a registed user and haven't verified his/her email yet
    # INPUT
    # :user_Ref (db obj) connection to user profile db
    # :email (string) user's email
    # OUTPUT: return TRUE if the email is verified, otherwise FALSE
    result = user_Ref.find({"_id": email}, {"email_verify": 1})[0]

    return True if result.get("email_verify") == 1 else False

