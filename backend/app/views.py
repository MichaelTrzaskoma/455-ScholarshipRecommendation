# from typing_extensions import Required

from werkzeug.datastructures import Authorization
from app import app
from flask import json, render_template, jsonify, request, make_response, redirect, url_for
import mailhandler
import hashlib
from pymongo import MongoClient
from datetime import datetime, timedelta
import time

from .auths import generateCode, init_usrProfileDB, check_email_verification_status, encode_jwt, update_deviceInfo, initial_device
from .recommend_model import updtUser, filter_results

MINS_TIL_ACTIVE_CODE_EXPIRY = 15
db = MongoClient("mongodb://localhost:27017/")
scholarDb = db.test
scholar_ref = db.test.scholarships
user_Ref = db.test.client_profile

ACTIVE_CODE_LENGTH = 64


@app.route("/")
def index():
    # print(authOutput)
    return render_template("public/index.html")


@app.route("/api/v1.2/managements/users/signup")
def signUp():
    return render_template("public/signup.html")


@app.route("/api/v1.2/managements/users/thankyou", methods=["POST", "GET"])
def thankYou():
    if(request.method == "POST"):
        page = request.form['pagePost']
        if(page == "signup"):
            email = request.form['inputEmail']
            password = request.form['inputPassword']

            # salt and hash password
            saltedPass = password + app.config['SALT_VALUE']
            hashPass = hashlib.md5(saltedPass.encode()).hexdigest()

            # For debugging purposes
            # user_Ref.delete_one({"_id" : email })

            # Check if email already exists in database
            results = user_Ref.count_documents({"_id": email})

            if(results != 0):
                return redirect(url_for('signUp', error="dup"))

            # Insert user into database
            activationCode = generateCode()
            init_usrProfileDB(user_Ref, email, password,
                              activationCode, datetime.now(), 0)

            # user_Ref.insert_one({ "_id": email, "password": password, "activationCode": activationCode, "activationDate": datetime.now(), "active": 0 })

            # Send welcome email
            mailhandler.sendWelcomeEmail(email, activationCode)

            return render_template("public/thankyou.html")
        else:
            email = request.form['email']
            print(email)

            # Try to look up email in database
            results = user_Ref.count_documents({"_id": email})

            # Send user back to /forgotpassword if no email found
            if(results == 0):
                return redirect(url_for('forgotpassword', error="unfound"))

            # Send reset password email to user if successful
            mailhandler.sendResetPasswordEmail(email)

            return render_template("public/thankyou2.html")


@app.route("/activate", methods=["POST", "GET"])
def activate():
    # get incoming account activation code
    code = request.args.get('code')

    # check if this code ever exists
    counter = user_Ref.count_documents({"activationCode": code})
    # print(f"Counter: {counter}")

    # validate the activation code
    if(len(code) != ACTIVE_CODE_LENGTH or counter != 1):
        return "Error"  # redirect(url_for('error', error="invalid"))

    # retrieve user profile info
    results = user_Ref.find_one({"activationCode": code})

    activationTime = results["activationDate"]
    email = results["_id"]

    # check if the activation code expiration timestamp
    # regenerate and resend the email if the code is expired
    if((datetime.now() - activationTime).total_seconds() / 60 > MINS_TIL_ACTIVE_CODE_EXPIRY):
        activationCode = generateCode()
        user_Ref.update_one({"_id": email}, {
                            "$set": {"activationCode": activationCode, "activationDate": datetime.now()}})
        mailhandler.sendWelcomeEmail(email, activationCode)
        return "Code Expired, sending new code"

    user_Ref.update_one({"_id": email}, {"$set": {"active": 1}})

    return "Account activated"


@app.route("/api/v1.2/managements/users/<email>/auth", methods=["POST"])
def auth(email):
    '''
    user login feature
    REQUIRMENT: a registered user
    INPUT: email (str) user's email address
    INCOMINT DATA
    :paswrd (str) user's password
    :unique_id (str) device unique UUID
    OUTPUT: result of login - JWT
    '''

    '''
        A user may allow to have multiple devices. 
        Each device will have differnt: uuid (unique id), token (randome str), a jwt code, and activateDate (time stampe).
        Check if there's any devices under client's profile
            If there's an exisiting device with same uuid in the record 
                --> why: the user was inactive for more than a week
                --> todo: regenerate the token and jwt code and then update into "devices" arr on db
            If there's no devices:
                --> todo: push the device to devices arr
                Note, if there's no 'devices' attribute, mongodb will automatically create it
            If there's exisitng devices and no matched uuid:
                --> todo: push the device to devices arr
    '''

    if request.method == "POST":

        income_data = request.json

        # validate the inputs and incoming data

        if 'email' not in income_data:
            return make_response(jsonify({"mesg": "An email is needed!"}), 400)

        if 'paswrd' not in income_data:
            return make_response(jsonify({"mesg": "A password is needed!"}), 400)

        if 'unique_id' not in income_data:
            return make_response(jsonify({"mesg": "Device is not supported!"}), 400)

        len_e = len(email)
        len_p = len(income_data['paswrd'])
        len_uid = len(income_data['unique_id'])

        if len_e == 0 or len_e < 1:
            return make_response(jsonify({"mesg": "Please enter an email"}), 400)

        if len_p == 0 or len_p < 1:
            return make_response(jsonify({"mesg": "Please enter a password"}), 400)

        if len_uid == 0 or len_uid < 1:
            return make_response(jsonify({"mesg": "An error occurred!"}), 400)

        # check if the user's email verification is verified or not
        # if not then either request users to verify or
        # resend a new link for verification
        r_email = user_Ref.count_documents({"_id": email})

        if r_email == 1:
            # there's a matched email

            # get the user profile for validation
            usr_profile_data = user_Ref.find_one(
                {"_id": email}, {"_id": 1, "devices": 1, "active": 1})

            # the user is registered with us and verified his/ her email address
            # print(usr_profile_data)

            if usr_profile_data["active"] != 0:
                # make sure the user's email is valified

                if 'devices' in usr_profile_data:
                    # there's a device list under user's profile
                    # check if there's an exisiting unique id
                    device_list = usr_profile_data["devices"]
                    device_info = list(filter(
                        lambda device: device['unique_id'] == income_data['unique_id'], device_list))

                    if len(device_info) == 1:
                        # there's a same match device in the user's profile
                        # this could be a re-login user
                        # so replace existing device info with current device info

                        # get existing device info
                        existing_device = device_info[0]

                        # generate a new device token
                        secret_code = generateCode()
                        timer = int(time.mktime((datetime.utcnow() + timedelta(days=7)).timetuple()))

                        # generate a new jwt code by using current device info
                        new_jwt = encode_jwt(
                            income_data['unique_id'], timer, 7, secret_code)

                        # update the device info
                        update_deviceInfo(
                            user_Ref, email, existing_device['unique_id'], new_jwt, income_data['unique_id'], secret_code, timer)

                        return make_response(jsonify({"mesg": "authorized!", "token": str(new_jwt)}), 202)

                    else:
                        # no matched device uuid found or doesn't ever have device info
                        # this is new login with a new device

                        # generate a new device token
                        secret_code = generateCode()
                        timer = int(time.mktime((datetime.utcnow() + timedelta(days=7)).timetuple()))

                        # generate a new jwt code by using current device info
                        new_jwt = encode_jwt(
                            income_data['unique_id'], timer, 7, secret_code)

                        initial_device(
                            user_Ref, email, new_jwt, income_data['unique_id'], secret_code, timer)

                        return make_response(jsonify({"mesg": "authorized!", "token": str(new_jwt)}), 202)

                else:
                    # no matched device uuid found or doesn't ever have device info
                    # this is new login with a new device

                    # generate a new device token
                    secret_code = generateCode()
                    timer = int(time.mktime((datetime.utcnow() + timedelta(days=7)).timetuple()))

                    # generate a new jwt code by using current device info
                    new_jwt = encode_jwt(
                        income_data['unique_id'], timer, 7, secret_code)

                    initial_device(
                        user_Ref, email, new_jwt, income_data['unique_id'], secret_code, timer)

                    return make_response(jsonify({"mesg": "authorized!", "token": str(new_jwt)}), 202)

            else:
                # user didn't verify his/ her email
                return make_response(jsonify({"mesg": "Please verify your email by using the link we sent you through email!"}), 400)
        else:
            # there's was no such email address in the db records
            return make_response(jsonify({"mesg": "Please signup an account first!"}), 400)

    else:
        return make_response(jsonify({"mesg": "Method is not allowed"}), 405)


@app.route("/api/v1.2/managements/users/forgotpassword")
def forgot():
    return render_template("public/forgotpass.html")


@app.route("/api/v1.2/resources/scholarships/view/categories/general")
def view_scholarship_generalCategory():
    # view a list of scholarship general category
    # OUTPUT: (list) return a list of scholarship general category

    # NOTE: need an exception handler to handle when no resule is returned!

    result = scholarDb.scholarDirectory.find({}, {"term": 1})
    i = []
    for item in result:
        i.append(item.get("term"))

    return make_response(jsonify(i), 202)


@app.route("/api/v1.2/resources/scholarships/view/categories/<cater>")
def view_scholarshipCategory(cater):
    # view scholarship info
    # INPUT: (string) general category of the scholarships
    # OUTPUT: return a scholarship category's sub-category info

    # NOTE: need an exception handler to handle when no resule is returned!

    result = list(scholarDb.scholarDirectory.find(
        {"term": cater}, {"subTerm": 1})[0].get("subTerm"))

    return make_response(jsonify(result), 202)


@app.route("/api/v1.2/resources/scholarships/view/categories/sub/<cater>")
def view_scholarship_index(cater):
    # view a list of sub-category scholarship info
    # INPUT: (string) name of the category
    # OUTPUT - (array) return a list of dictionary of scholarship under a specific sub-category
    # :amount (string) scholarship amount
    # :deadline (string) date of the scholarships/ 'Deadline Varies'
    # :name: (string) title of the scholarships

    # NOTE: need an exception handler to handle when no resule is returned!

    indexing = []
    result = scholarDb.scholarships.find(
        {"terms": {'$in': [cater]}}, {"name": 1, "amount": 1, "deadline": 1})

    for item in result:
        indexing.append({"name": item.get("name"), "amount": item.get(
            "amount"), "deadline": item.get("deadline")})

    return make_response(jsonify(indexing), 202)


@app.route("/api/v1.2/resources/scholarships/view/titles/<scholarship_title>")
def view_scholarship_single(scholarship_title):
    # get a specific scholarship info
    # INPUT: (string) scholarship title
    # OUTPUT: (key-value pair) return a key-val pair of scholarship info

    # NOTE: need an exception handler to handle when no resule is returned!

    scholarship = {}

    result = scholarDb.scholarships.find({"name": scholarship_title}, {
        "name": 1, "amount": 1, "deadline": 1, "awards available": 1, "direct Link": 1, "description": 1, "contact Info": 1})[0]

    scholarship["name"] = result.get("name")
    scholarship["amount"] = result.get("amount")
    scholarship["deadline"] = result.get("deadline")
    scholarship["awards_available"] = result.get("awards available")
    scholarship["direct_link"] = result.get("direct Link")
    scholarship["description"] = result.get("description")
    scholarship["contact_info"] = result.get("contact Info")

    return make_response(jsonify(scholarship), 202)


@app.route("/api/v1.2/users/id/<email>/surveys/scholarship",  methods=["POST"])
def usrSurvey_scholarship(email):
    # add user survey to profile
    # REQUIREMENT: a registered user
    # INPUT
    # :email (string)
    # :POST data
    if request.method == "POST":
        income_data = request.json
        if income_data["email"] == "":
            return make_response(jsonify({"mesg": "Missing email address"}), 400)

        if income_data["gender"] == "":
            return make_response(jsonify({"mesg": "Missing gender information"}), 400)

        if income_data["dob"] == "":
            return make_response(jsonify({"mesg": "Missing date of birth"}), 400)

        if income_data["zip"] == "":
            return make_response(jsonify({"mesg": "Missing zip code"}), 400)

        updtUser(
            db,
            user_Ref,
            income_data['email'],
            income_data['gender'],
            income_data['dob'],
            income_data['zip'],
            income_data['gpa'],
            major=income_data['major'],
            race=income_data['race'],
            ethnicity=income_data['ethnicity'],
            religion=income_data['religion'],
            dissabilities=income_data['disabilities'],
            sat=income_data['sat_score'],
        )

        # updtUser(db, user_Ref, "hchen60@nyit.edu", "Male", "01/18/1998", "11223", "3.41",
        #          "Computer Science", "Asian/Pacific Islander", "Chinese",
        #          "Buddhist")

        return make_response(jsonify({"mesg": "Your information has successfully captured!"}), 202)
    else:
        return make_response(jsonify({"mesg": "Method is not allowed"}), 405)


@app.route("/api/v1.2/users/id/<email>/recommends/scholarship",  methods=["GET"])
def getRecommend_scholarship(email):
    # get scholarship recommendations
    # INPUT: email (string)
    # OUTPUT: scholarship title, amount, and deadline
    # updtUser(db, user_Ref, "hchen60@nyit.edu", "Male", "01/18/1998", "11223", "3.41",
    #      "Computer Science", race=["Asian/Pacific Islander"], ethnicity=["Chinese"],
    #      religion=["Buddhist"])

    if request.method == "GET":
        result = filter_results(user_Ref, scholar_ref, email)
        return make_response(jsonify(result), 202)
    else:
        return make_response(jsonify({"mesg": "Method is not allowed!"}), 405)
