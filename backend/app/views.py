# from typing_extensions import Required
from werkzeug.datastructures import Authorization
from app import app
from flask import json, render_template, jsonify, request, make_response, redirect, url_for
import mailhandler
import hashlib
from pymongo import MongoClient
from datetime import date, datetime, timedelta
import time

from .auths import generateCode, init_usrProfileDB, check_email_verification_status, encode_jwt, update_deviceInfo, initial_device, update_deviceInfo, validate_token, validate_email
from .recommend_model import updtUser, filter_results, updtScholarSurvey
from .utilities import *

MINS_TIL_ACTIVE_CODE_EXPIRY = 15
MINS_TIL_RESET_CODE_EXPIRY = 60

db = MongoClient(app.config["DB_IP"], app.config["DB_PORT"], serverSelectionTimeoutMS=10, connectTimeoutMS=20000)
scholarDb = db.test
scholar_ref = db.test.scholarships
college_ref = db.test.colleges
major_ref = db.test.majors
user_Ref = db.test.client_profile

ACTIVE_CODE_LENGTH = 64


@app.route("/test")
def testJWT():
    income_data = request.json
    r = validate_token(
        user_Ref, income_data['jwt'], income_data['uuid'], income_data['email'])
    # print(income_data)
    return make_response(jsonify({"msg": r}))


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
        text = ""
        print("Page: " + page)
        if(page == "signup"):
            email = request.form['inputEmail']
            password = request.form['inputPassword']

            # salt and hash password
            saltedPass = password + app.config['SALT_VALUE']
            hashPass = hashlib.md5(saltedPass.encode()).hexdigest()

            # For debugging purposes
            # user_Ref.delete_one({"_id" : email })

            # Check if email already exists in database
            # results = user_Ref.count_documents({"_id": email})

            if validate_email(user_Ref, email):
                return redirect(url_for('signUp', error="dup"))

            # Insert user into database
            activationCode = generateCode()

            init_usrProfileDB(user_Ref, email, hashPass,
                              activationCode, datetime.now(), 0)
            # Send welcome email

            mailhandler.sendWelcomeEmail(email, activationCode)
            text = "<strong>Please check your email</strong> for further instructions on how to complete your account setup."
        elif(page == "forgot"):
            email = request.form['email']
            print(email)

            # Try to look up email in database
            # results = user_Ref.count_documents({"_id": email})

            # Send user back to /forgotpassword if no email found
            if validate_email(user_Ref, email):
                return redirect(url_for('forgotpassword', error="unfound"))
            resetCode = generateCode()
            scholarDb.users.update_one({"email": email}, {"$set": {
                                       "resetCode": resetCode, "resetDate": datetime.now(), "resetCodeUsed": 0}})
            # Send reset password email to user if successful
            mailhandler.sendResetPasswordEmail(email, resetCode)
            text = "<strong>Please check your email</strong> for further instructions on how to reset your password."
        elif(page == "activate"):
            code = request.form['code']
            results = scholarDb.users.find({"activationCode": code})
            if(len(code) != ACTIVE_CODE_LENGTH or results.count() != 1):

                redirect(url_for('error', error="invalidcode"))
                return
            activationTime = results[0]["activationDate"]
            email = results[0]["email"]
            if((datetime.now() - activationTime).total_seconds() / 60 > MINS_TIL_ACTIVE_CODE_EXPIRY):
                activationCode = generateCode()

                scholarDb.users.update_one({"_id": email}, {
                                           "$set": {"activationCode": activationCode, "activationDate": datetime.now()}})
                mailhandler.sendWelcomeEmail(email, activationCode)
                text = "<strong>That code is expired.</strong> Sending a new activation code."
            else:
                scholarDb.users.update_one(
                    {"_id": email}, {"$set": {"active": 1}})

                text = "<strong>Your account is now active!</strong>"
        elif(page == "reset"):
            code = request.form['code']
            print("Code: " + code)
            results = scholarDb.users.find({"resetCode": code})
            if(results.count() == 0):
                redirect(url_for('error', error="invalidcode"))
                return
            email = results[0]["_id"]
            password = request.form['password']

            # salt and hash password
            saltedPass = password + app.config['SALT_VALUE']
            hashPass = hashlib.md5(saltedPass.encode()).hexdigest()
            scholarDb.users.update_one(
                {"_id": email}, {"$set": {"resetCodeUsed": 1, "paswrd": hashPass}})
            text = "<strong>Your password has been reset!</strong> Click the button below to log in with your new password"
        if(text != ""):
            return render_template("public/thankyou.html", text=text)
    redirect(url_for('error', error="404"))


@app.route("/activate", methods=["POST", "GET"])
def activate():
    # get incoming account activation code
    code = request.args.get('code')

    # check if this code ever exists
    counter = user_Ref.count_documents({"activationCode": code})
    # print(f"Counter: {counter}")

    # validate the activation code
    if(len(code) != ACTIVE_CODE_LENGTH or counter != 1):
        redirect(url_for('error', error="invalidcode"))

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
        redirect(url_for('error', error="expiredcode"))

        return
    user_Ref.update_one({"_id": email}, {"$set": {"active": 1}})
    return "Account activated"


@app.route("/error", methods=["POST", "GET"])
def error():
    errorName = request.args.get("error")
    errorVal = ""
    if(errorName == "invalidcode"):
        errorVal = "The code you entered was not found. Please check your email again and make sure you copied the URL correctly."
    return render_template("public/error.html", error=errorVal)


@app.route("/api/v1.2/managements/users/<email>", methods=["POST"])
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

        if '@' not in email:
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
        # r_email = user_Ref.count_documents({"_id": email})

        if validate_email(user_Ref, email):
            # there's a matched email

            # get the user profile for validation
            usr_profile_data = user_Ref.find_one(
                {"_id": email}, {"_id": 1, "devices": 1, "active": 1, "paswrd": 1})

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

                        # TODO: compare password here
                        password = income_data["paswrd"]
                        # salt and hash password
                        saltedPass = password + app.config['SALT_VALUE']
                        hashPass = hashlib.md5(saltedPass.encode()).hexdigest()

                        if(hashPass != usr_profile_data["paswrd"]):
                            return make_response(jsonify({"mesg": "unauthorized"}), 401)

                        # generate a new device token
                        secret_code = generateCode()

                        timer = int(time.mktime(
                            (datetime.datetime.utcnow() + timedelta(days=7)).timetuple()))

                        # generate a new jwt code by using current device info
                        new_jwt = encode_jwt(
                            income_data['unique_id'], timer, 7, secret_code)

                        # update the device info
                        update_deviceInfo(
                            user_Ref, email, existing_device['unique_id'], new_jwt, income_data['unique_id'], secret_code, timer)

                        return make_response(jsonify({"mesg": "authorized", "token": str(new_jwt)}), 202)

                # no matched device uuid found or doesn't ever have device info
                # this is new login with a new device

                # TODO: compare password here
                password = income_data["paswrd"]
                # salt and hash password
                saltedPass = password + app.config['SALT_VALUE']
                hashPass = hashlib.md5(saltedPass.encode()).hexdigest()

                if(hashPass != usr_profile_data["paswrd"]):
                    return make_response(jsonify({"mesg": "unauthorized"}), 401)

                # generate a new device token
                secret_code = generateCode()
                timer = int(time.mktime(
                    (datetime.datetime.utcnow() + timedelta(days=7)).timetuple()))

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


@app.route("/resetpassword", methods=["POST", "GET"])
def reset():
    code = request.args.get('code')
    results = scholarDb.users.find({"resetCode": code})
    if(len(code) != ACTIVE_CODE_LENGTH or results.count() != 1):
        redirect(url_for('error', error="invalidcode"))
        return
    activationTime = results[0]["resetDate"]
    email = results[0]["email"]
    if((datetime.now() - activationTime).total_seconds() / 60 > MINS_TIL_RESET_CODE_EXPIRY):
        activationCode = generateCode()
        scholarDb.users.update_one({"email": email}, {"$set": {
                                   "resetCode": resetCode, "resetDate": datetime.now(), "resetCodeUsed": 0}})
        mailhandler.sendResetPasswordEmail(email, resetCode)
        redirect(url_for('error', error="expiredcode"))
        return
    return render_template("public/resetpass.html", code=code)


@app.route("/api/v1.2/managements/users/forgotpassword")
def forgot():
    return render_template("public/forgotpass.html")


# Scholarship Resources


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


@app.route("/api/v1.2/resources/scholarships/view/titles/<scholarship_title>/<email>/<token>/<id>")
def view_scholarship_single(scholarship_title, email, token, id):
    # get a specific scholarship info
    # INPUT
    # :scholarship_title (string) scholarship title
    # :email (str) user's email
    # :token (str) device JWT code
    # :id (str) device UUID
    # OUTPUT: (key-value pair) return a key-val pair of scholarship info

    # try:

    if validate_email(user_Ref, email):
        scholarship = {}

        result = scholarDb.scholarships.find_one({"name": scholarship_title}, {
            "name": 1, "amount": 1, "deadline": 1, "awards available": 1, "direct Link": 1, "description": 1, "contact Info": 1})

        scholarship["name"] = result.get("name")
        scholarship["amount"] = result.get("amount")
        scholarship["deadline"] = result.get("deadline")
        scholarship["awards_available"] = result.get("awards available")
        scholarship["direct_link"] = result.get("direct Link")
        scholarship["description"] = result.get("description")
        scholarship["contact_info"] = result.get("contact Info")

        # TODO @Greg - since we automatically receiving the user's info, insert the recent view here.

        return make_response(jsonify(scholarship), 202)

    return make_response(jsonify({"mesg": "Unauthorized!"}), 401)

    # except:
    #     return make_response(jsonify({"mesg": "An error occured!"}), 400)
    


# College Resources


@app.route("/api/v1.2/resources/college/view/states/<state>")
def view_college_stateIndex(state):
    # view college within a specific state
    # INPUT: state (str) name
    # OUTPUT: return an message arr, and each ele contains title of the college

    if state in app.config['STATES'] and request.method == "GET":
        r = college_ref.find({"location_tags": state}, {"_id": 0, "name": 1})

        resource = []
        for item in r:
            resource.append(item['name'])

        return make_response(jsonify({"mesg": resource}), 202)

    return make_response(jsonify({"mesg": "Method not allowed!"}), 405)


@app.route("/api/v1.2/resources/colleges/view/titles/<college_name>/<email>/<token>/<id>")
def view_college_single(college_name, email, token, id):
    # view a single college informationn in detail
    # INPUT: college_name (str)
    # OUTPUT: return a

    if request.method == "GET":

        if validate_email(user_Ref, email):
            # select 62 fields from the db
            r = college_ref.find_one({"name": college_name}, {
                "_id": 0,
                "name": 1,
                "description": 1,
                "site": 1,
                "address": 1,
                "about": 1,
                "athletics": 1,
                "ranking": 1,
                "location_tags": 1,
                "admission.acceptance.rate": 1,
                "admission.sat.accept_score_range": 1,
                "admission.sat.reading_score": 1,
                "admission.sat.math_score": 1,
                "admission.act.accept_score_range": 1,
                "admission.act.eng_score": 1,
                "admission.act.math_score": 1,
                "admission.act.write_score": 1,
                "admission.deadline.date": 1,
                "admission.application.website": 1,
                "admission.application.comm_app": 1,
                "admission.application.accept_coalition_app": 1,
                "admission.requirements.highscho_gpa": 1,
                "admission.requirements.highscho_rank": 1,
                "admission.requirements.highscho_transcript": 1,
                "admission.requirements.uni_precourse": 1,
                "admission.requirements.sat_or_act": 1,
                "admission.requirements.recommendation": 1,
                "cost.tuition.in_state": 1,
                "cost.tuition.out_state": 1,
                "cost.tuition.avg_housing": 1,
                "cost.tuition.avg_meal_plan": 1,
                "cost.tuition.book": 1,
                "academic.graduation_rate": 1,
                "academic.class_size_ratio.2-19_students": 1,
                "academic.class_size_ratio.20-39": 1,
                "academic.class_size_ratio.40-99": 1,
                "academic.class_size_ratio.100+": 1,
                "academic.popular_major": 1,
                "academic.faculty.ratio": 1,
                "academic.faculty.female": 1,
                "academic.faculty.male": 1,
                "major.gender_ratio.female_undergrads": 1,
                "major.gender_ratio.male_undergrads": 1,
                "major.residence.In-State": 1,
                "major.residence.Out-of-State": 1,
                "major.residence.International": 1,
                "major.age.Under_18": 1,
                "major.age.18-19": 1,
                "major.age.20-21": 1,
                "major.age.22-24": 1,
                "major.age.Over_25": 1,
                "major.racial_diversity.African_American": 1,
                "major.racial_diversity.Asian": 1,
                "major.racial_diversity.Hispanic": 1,
                "major.racial_diversity.International_(Non-Citizen)": 1,
                "major.racial_diversity.Multiracial": 1,
                "major.racial_diversity.Native_American": 1,
                "major.racial_diversity.Pacific_Islander": 1,
                "major.racial_diversity.White": 1,
                "campus_life.sport.male": 1,
                "campus_life.sport.female": 1,
                "campus_life.club.offered": 1,
                "campus_life.club.music": 1,
                "after_uni.graudation_rate": 1,
                "after_uni.earning.2yr": 1,
                "after_uni.employment.2yr": 1,
            })

            result = {
                # about
                "tag_1": trimmer_na(r['about'][0]) if check_nest1(r, "about") and len(r['about'][0]) > 3 else "None",
                "tag_2": trimmer_na(r['about'][1]) if check_nest1(r, "about") and len(r['about'][1]) > 3 else "None",

                # University location
                "city": trimmer_na(r["location_tags"][0]) if check_nest1(r, "location_tags") and len(r['location_tags'][0]) > 3 else "None",
                "regsion": trimmer_na(r["location_tags"][1]) if check_nest1(r, "location_tags") and len(r['location_tags'][1]) > 3 else "None",

                # class ratio
                "class_ratio_2TO19": trimmer_na(r['academic']['class_size_ratio']['2-19_students']) if check_nest3(r, "academic", "class_size_ratio", "2-19_students") else "None",
                "class_ratio_20TO39": trimmer_na(r['academic']['class_size_ratio']['20-39']) if check_nest3(r, "academic", "class_size_ratio", "20-39") else "None",
                "class_ratio_40TO99": trimmer_na(r['academic']['class_size_ratio']['40-99']) if check_nest3(r, "academic", "class_size_ratio", "40-99") else "None",
                "class_ratio_100UP": trimmer_na(r['academic']['class_size_ratio']['100+']) if check_nest3(r, "academic", "class_size_ratio", "100+") else "None",

                # faculty info
                "faculty_ratio": trimmer_na(r['academic']['faculty']['ratio']) if check_nest3(r, "academic", "faculty", "ratio") else "None",
                "faculty_female": trimmer_na(r['academic']['faculty']['female']) if check_nest3(r, "academic", "faculty", "female") else "None",
                "faculty_male": trimmer_na(r['academic']['faculty']['male']) if check_nest3(r, "academic", "faculty", "male") else "None",

                "graduation_rate": trimmer_na(r['academic']['graduation_rate']) if check_nest2(r, "academic", "graduation_rate") else "None",
                "address": r['address'] if check_nest1(r, "address") else "None",
                "acceptance_rate": trimmer_na(r['admission']['acceptance']['rate']) if check_nest3(r, "admission", "acceptance", "rate") else "None",

                # ACT info
                "act_accept_score_range": trimmer_na(r['admission']['act']['accept_score_range']) if check_nest3(r, "admission", "act", "accept_score_range") else "None",
                "act_eng_score_range": trimmer_na(r['admission']['act']['eng_score']) if check_nest3(r, "admission", "act", "eng_score") else "None",
                "act_math_score_range": trimmer_na(r['admission']['act']['math_score']) if check_nest3(r, "admission", "act", "math_score") else "None",
                "act_write_score_range": trimmer_na(r['admission']['act']['write_score']) if check_nest3(r, "admission", "act", "write_score") else "None",

                # application
                "coalition_app": trimmer_na(r['admission']['application']['accept_coalition_app']) if check_nest3(r, "admission", "application", "accept_coalition_app") else "None",
                "comm_app": trimmer_na(r['admission']['application']['comm_app']) if check_nest3(r, "admission", "application", "comm_app") else "None",
                "application_website": trimmer_na(r['admission']['application']['website']) if check_nest3(r, "admission", "application", "website") else "None",
                "application_deadline": trimmer_na(r['admission']['deadline']['date']) if check_nest3(r, "admission", "deadline", "date") else "None",

                # high school
                "highSchool_gpa": trimmer_na(r['admission']['requirements']['highscho_gpa']) if check_nest3(r, "admission", "requirements", "highscho_gpa") else "None",
                "highSchool_rank": trimmer_na(r['admission']['requirements']['highscho_rank']) if check_nest3(r, "admission", "requirements", "highscho_rank") else "None",
                "highSchool_transcripts": trimmer_na(r['admission']['requirements']['highscho_transcript']) if check_nest3(r, "admission", "requirements", "highscho_transcript") else "None",
                "recommendationLetter": trimmer_na(r['admission']['requirements']['recommendation']) if check_nest3(r, "admission", "requirements", "recommendation") else "None",
                "sat_or_act": trimmer_na(r['admission']['requirements']['sat_or_act']) if check_nest3(r, "admission", "requirements", "sat_or_act") else "None",
                "uni_precourse": trimmer_na(r['admission']['requirements']['uni_precourse']) if check_nest3(r, "admission", "requirements", "uni_precourse") else "None",

                # SAT info
                "sat_accept_score_range": trimmer_na(r['admission']['sat']['accept_score_range']) if check_nest3(r, "admission", "sat", "accept_score_range") else "None",
                "sat_math_score_range": trimmer_na(r['admission']['sat']['math_score']) if check_nest3(r, "admission", "sat", "math_score") else "None",
                "sat_read_score_range": trimmer_na(r['admission']['sat']['reading_score']) if check_nest3(r, "admission", "sat", "reading_score") else "None",

                # after uni
                "earning_after_uni": trimmer_na(r['after_uni']['earning']['2yr']) if check_nest3(r, "after_uni", "earning", "2yr") else "None",
                "employ_after_uni": trimmer_na(r['after_uni']['earning']['2yr']) if check_nest3(r, "after_uni", "employment", "2yr") else "None",
                
                # graudation
                "graudation_rate": trimmer_na(r['after_uni']['graudation_rate']) if check_nest2(r, "after_uni", "graudation_rate") else "None",

                # athletics info
                "athleticsC": trimmer_na(r['athletics']['conference']) if check_nest2(r, "athletics", "conference") else "None",
                "athleticsD": trimmer_na(r['athletics']['division']) if check_nest2(r, "athletics", "division") else "None",

                # clubs
                "music": trimmer_na(arr2str(r['campus_life']['club']['music'])) if check_nest3(r, "campus_life", "club", "music") else "None",
                "club": trimmer_na(arr2str(r['campus_life']['club']['offered'])) if check_nest3(r, "campus_life", "club", "offered") else "None",
                "sport_female": trimmer_na(arr2str(r['campus_life']['sport']['female'])) if check_nest3(r, "campus_life", "sport", "female") else "None",
                "sport_male": trimmer_na(arr2str(r['campus_life']['sport']['male'])) if check_nest3(r, "campus_life", "sport", "male") else "None",

                # tuitions
                "avg_housing": trimmer_price(r['cost']['tuition']['avg_housing']) if check_nest3(r, "cost", "tuition", "avg_housing") else "None",
                "avg_meal_plan": trimmer_price(r['cost']['tuition']['avg_meal_plan']) if check_nest3(r, "cost", "tuition", "avg_meal_plan") else "None",
                "book_cost": trimmer_price(r['cost']['tuition']['book']) if check_nest3(r, "cost", "tuition", "book") else "None",
                "tuition_in_state": trimmer_price(r['cost']['tuition']['in_state']) if check_nest3(r, "cost", "tuition", "in_state") else "None",
                "tuition_out_state": trimmer_price(r['cost']['tuition']['out_state']) if check_nest3(r, "cost", "tuition", "out_state") else "None",

                # description
                "description": trimmer_nextline(r['description']) if check_nest1(r, "description") else "None",

                # student info
                "student_age_18TO19": trimmer_na(r['major']['age']['18-19']) if check_nest3(r, "major", "age", "18-19") else "None",
                "student_age_20TO21": trimmer_na(r['major']['age']['20-21']) if check_nest3(r, "major", "age", "20-21") else "None",
                "student_age_22TO24": trimmer_na(r['major']['age']['22-24']) if check_nest3(r, "major", "age", "22-24") else "None",
                "student_age_25UP": trimmer_na(r['major']['age']['Over_25']) if check_nest3(r, "major", "age", "Over_25") else "None",
                "student_age_Under_18": trimmer_na(r['major']['age']['Under_18']) if check_nest3(r, "major", "age", "Under_18") else "None",

                # major
                "popular_majors": trimmer_na(arr2str(r['academic']['popular_major'])) if check_nest2(r, "academic", "popular_major") else "None",

                # gender ratio
                "female_undergrads_ratio": trimmer_na(r['major']['gender_ratio']['female_undergrads']) if check_nest3(r, "major", "gender_ratio", "female_undergrads") else "None",
                "male_undergrads_ratio": trimmer_na(r['major']['gender_ratio']['male_undergrads']) if check_nest3(r, "major", "gender_ratio", "male_undergrads") else "None",

                "racial_aa": trimmer_na(r['major']['racial_diversity']['African_American']) if check_nest3(r, "major", "racial_diversity", "African_American") else "None",
                "racial_asian": trimmer_na(r['major']['racial_diversity']['Asian']) if check_nest3(r, "major", "racial_diversity", "Asian") else "None",
                "racial_hispanic": trimmer_na(r['major']['racial_diversity']['Hispanic']) if check_nest3(r, "major", "racial_diversity", "Hispanic") else "None",
                "racial_international": trimmer_na(r['major']['racial_diversity']['International_(Non-Citizen)']) if check_nest3(r, "major", "racial_diversity", "International_(Non-Citizen)") else "None",
                "racial_multiracial": trimmer_na(r['major']['racial_diversity']['Multiracial']) if check_nest3(r, "major", "racial_diversity", "Multiracial") else "None",
                "racial_na": trimmer_na(r['major']['racial_diversity']['Native_American']) if check_nest3(r, "major", "racial_diversity", "Native_American") else "None",
                "racial_pi": trimmer_na(r['major']['racial_diversity']['Pacific_Islander']) if check_nest3(r, "major", "racial_diversity", "Pacific_Islander") else "None",
                "racial_white": trimmer_na(r['major']['racial_diversity']['White']) if check_nest3(r, "major", "racial_diversity", "White") else "None",

                # student residence
                "residence_in_state": trimmer_na(r['major']['residence']['In-State']) if check_nest3(r, "major", "residence", "In-State") else "None",
                "residence_international": trimmer_na(r['major']['residence']['International']) if check_nest3(r, "major", "racial_diversity", "International") else "None",
                "residence_out_state": trimmer_na(r['major']['residence']['Out-of-State']) if check_nest3(r, "major", "racial_diversity", "Out-of-State") else "None",
                "uni_name": trimmer_na(r['name']) if check_nest1(r, "name") else "None",
                "ranking": parseCollegeRanking(r['ranking']) if len(r['ranking']) > 0 else "None",
                "offical_site": trimmer_na(r['site']) if len(r['site']) > 0 else "None"
            }

            # TODO @Greg - since we automatically receiving the user's info, insert the recent view here.

            return make_response(jsonify({"mesg": result}), 202)

    return make_response(jsonify({"mesg": "Method not allowed!"}), 405)


# Major Resources
@app.route("/api/v1.2/resources/major/view/subjects/<sub>")
def view_major_subjectIndex(sub):
    # view all majors that follow unders a specific subject
    # INPUT: sub (str) name of the subject
    # OUTPUT: return a list of major name

    if request.method == "GET":
        r = major_ref.find({"subjects": sub}, {"_id": 0, "major": 1})

        resource = []
        for item in r:
            resource.append(item['major'])

        return make_response(jsonify({"mesg": resource}), 202)

    return make_response(jsonify({"mesg": "Method not allowed!"}), 405)


@app.route("/api/v1.2/resources/majors/view/titles/<major_name>/<email>/<token>/<id>")
def view_major_single(major_name, email, token, id):
    # view a single major detail from the given name
    # INPUT: major_name (str) the name of the major
    # OUTPUT: return a dict that contains all necessary info about this major

    if request.method == "GET":

        if validate_email(user_Ref, email):
            r = major_ref.find_one({"major": major_name}, {"_id": 0})

            resource = []
            for item in r:
                resource.append(item)
            
            # TODO @Greg - since we automatically receiving the user's info, insert the recent view here.

            return make_response(jsonify({"mesg": resource}), 202)

    return make_response(jsonify({"mesg": "Method not allowed!"}), 405)


# Management - Surveys


@app.route("/api/v1.2/users/id/<email>/<token>/<id>/surveys/scholarship",  methods=["GET", "POST", "PATCH"])
def usrSurvey_scholarship(email, token, id):
    # add user survey to profile
    # REQUIREMENT: a registered user

    if request.method == "POST" and request.is_json:
        # user try to append the scholarship survey

        income_data = request.json

        # print(income_data)
        if "gender" not in income_data:
            return make_response(jsonify({"mesg": "Missing gender information"}), 400)
        if len(income_data["gender"]) < 1:
            return make_response(jsonify({"mesg": "Missing gender information"}), 400)

        if "dob" not in income_data:
            return make_response(jsonify({"mesg": "Missing age"}), 400)
        if len(income_data["dob"]) < 1:
            return make_response(jsonify({"mesg": "Missing age"}), 400)

        if "gpa" not in income_data:
            return make_response(jsonify({"mesg": "Missing gpa"}), 400)
        if len(income_data["gpa"]) < 1:
            return make_response(jsonify({"mesg": "Missing gpa"}), 400)

        if "selectedResidences" not in income_data:
            return make_response(jsonify({"mesg": "Missing states"}), 400)
        if len(income_data["selectedResidences"]) < 1:
            return make_response(jsonify({"mesg": "Missing states"}), 400)

        # if validate_token(user_Ref, income_data["jwt"], income_data["uuid"], income_data["email"]):

        # append to scholarship survey
        updtScholarSurvey(
            db,
            user_Ref,
            email,  
            income_data['gender'],
            income_data['dob'],
            income_data['gpa'],
            income_data['selectedResidences'],
            sat=income_data['sat_score'],
            act=income_data['act_score'],
            major=income_data['selectedMajors'],
            race=income_data['selectedRaces'],
            ethnicity=income_data['selectedEthnicities'],
            religion=income_data['selectedReligions'],
            dissabilities=income_data['selectedDisabilities'],
        )

        # append to college survey
        insert_college_survey(user_Ref, email, income_data["selectedReligions"],
                              income_data['selectedMajors'], sat=income_data['sat_score'], act=income_data['act_score'])

        return make_response(jsonify({"mesg": "Your information has successfully captured!"}), 202)

    elif request.method == "GET":
        # user try to append the scholarship survey

        # TODO: check the user auth

        # income_data = request.json

        # r = user_Ref.count_documents({"_id": email})
        result = {}

        if validate_email(user_Ref, email):
            resource = user_Ref.find_one(
                {"_id": email}, {"_id": 0, "survey_scholarship": 1})

            if check_nest2(resource, "survey_scholarship", "gender"):
                result = {
                    "existing": int(1),
                    "gender": resource["survey_scholarship"]["gender"],
                    "age": resource["survey_scholarship"]["age"],
                    "gpa": resource["survey_scholarship"]["gpa"],
                    "states": resource["survey_scholarship"]["states"],
                    "sat":  resource["survey_scholarship"]["sat_score"],
                    "act": resource["survey_scholarship"]["act_score"],
                    "major": resource["survey_scholarship"]["major"],
                    "race": resource["survey_scholarship"]["race"],
                    "ethnicity": resource["survey_scholarship"]["ethnicity"],
                    "religion": resource["survey_scholarship"]["religion"],
                    "dissabilities": resource["survey_scholarship"]["disabilities"],
                }

                return make_response(jsonify({"mesg": result}), 202)

        result = {"existing": int(0)}
        return make_response(jsonify({"mesg": result}), 202)

    elif request.method == "PATCH" and request.is_json:
        # user try to append the scholarship survey

        # TODO: check user's auth

        income_data = request.json

        # r = user_Ref.count_documents({"_id": email})

        if validate_email(user_Ref, email):
            updtScholarSurvey(
                db,
                user_Ref,
                email,
                income_data['gender'],
                income_data['dob'],
                income_data['gpa'],
                income_data['selectedResidences'],
                sat=income_data['sat_score'],
                act=income_data['act_score'],
                major=income_data['selectedMajors'],
                race=income_data['selectedRaces'],
                ethnicity=income_data['selectedEthnicities'],
                religion=income_data['selectedReligions'],
                dissabilities=income_data['selectedDisabilities'],
            )

            # append the survey to college attribute
            insert_college_survey(user_Ref, email, income_data["selectedReligions"],
                              income_data['selectedMajors'], sat=income_data['sat_score'], act=income_data['act_score'])

            return make_response(jsonify({"mesg": "Your scholarship survey has successfully modified!"}), 202)

        return make_response(jsonify({"mesg": "Failed to modify your survey!"}), 400)

    else:
        return make_response(jsonify({"mesg": "Method is not allowed"}), 405)


@app.route("/api/v1.2/users/id/<email>/<token>/<id>/surveys/college",  methods=["GET", "POST", "PATCH"])
def usrSurvey_college(email, token, id):

    if request.method == "POST" and request.is_json:

        # TODO: validate the user auth and jwt

        income_data = request.json

        # validate the incoming data
        if "selectedReligions" not in income_data:
            return make_response(jsonify({"mesg": "Missing region information"}), 400)
        if len(income_data["selectedMajors"]) < 1:
            return make_response(jsonify({"mesg": "Missing region information"}), 400)

        if "selectedMajors" not in income_data:
            return make_response(jsonify({"mesg": "Missing major information"}), 400)
        if len(income_data["selectedMajors"]) < 1:
            return make_response(jsonify({"mesg": "Missing major information"}), 400)

        if validate_email(user_Ref, email):
            insert_college_survey(user_Ref, email, income_data["selectedReligions"],
                                income_data['selectedMajors'], sat=income_data['sat_score'], act=income_data['act_score'])

        return make_response(jsonify({"mesg": "Your information has successfully captured!"}), 202)

    elif request.method == "GET" and request.is_json:
        # retrieve existing college survey data

        # TODO: validate the and jwt

        income_data = request.json

        result = {}

        if validate_email(user_Ref, email):
            
            resource = get_college_survey(user_Ref, email)

            if check_nest2(resource, "survey_college", "regions") and check_nest2(resource, "survey_college", "majors"):
                # since the college survey is appended separately from the scholarship survey
                # we just located the college survey

                if len(resource["survey_college"]["regions"][0]) > 1 and len(resource["survey_college"]["majors"][0]) > 1:
                    resource["existing"] = int(1)

                    return make_response(jsonify({"mesg": resource}), 202)

        result = {"existing": int(0)}
        return make_response(jsonify({"mesg": result}), 202)

    elif request.method == "PATCH" and request.is_json:
        # user try to append the college survey

        # TODO: check user's auth and jwt
        income_data = request.json

        # validate the incoming data
        if "selectedReligions" not in income_data:
            return make_response(jsonify({"mesg": "Missing region information"}), 400)
        if len(income_data["selectedMajors"]) < 1:
            return make_response(jsonify({"mesg": "Missing region information"}), 400)

        if "selectedMajors" not in income_data:
            return make_response(jsonify({"mesg": "Missing major information"}), 400)
        if len(income_data["selectedMajors"]) < 1:
            return make_response(jsonify({"mesg": "Missing major information"}), 400)


        if validate_email(user_Ref, email):
            insert_college_survey(user_Ref, email, income_data["selectedReligions"],
                        income_data['selectedMajors'], sat=income_data['sat_score'], act=income_data['act_score'])

            # append the data into scholarship survey attribute
            append_scholarSurvey_fromCollegeSurvey(user_Ref, email, income_data["selectedReligions"],
                        income_data['selectedMajors'], sat=income_data['sat_score'], act=income_data['act_score'])

            return make_response(jsonify({"mesg": "Your college survey has successfully modified!"}), 202)

        return make_response(jsonify({"mesg": "Failed to modify your survey!"}), 400)

    else:
        return make_response(jsonify({"mesg": "Method is not allowed"}), 405)


@app.route("/api/v1.2/users/id/<email>/<token>/<id>/surveys/major",  methods=["GET", "POST", "PATCH"])
def usrSurvey_major(email, token, id):
    
    if request.method == "POST" and request.is_json:

        # TODO: validate the user auth and jwt

        income_data = request.json

        # validate the incoming data
        if "regions" not in income_data:
            return make_response(jsonify({"mesg": "Missing region information"}), 400)
        if len(income_data["regions"]) < 1:
            return make_response(jsonify({"mesg": "Missing region information"}), 400)

        if "majors" not in income_data:
            return make_response(jsonify({"mesg": "Missing major information"}), 400)
        if len(income_data["majors"]) < 1:
            return make_response(jsonify({"mesg": "Missing major information"}), 400)

        # ==================== PLACEHOLDER ====================
        # TODO: some sort of func to append the data into db
        # append_college_survey(
        #     db,
        #     user_Ref,
        #     income_data["regions"],
        #     income_data["majors"],
        #     income_data["sat_score"],
        #     income_data["act_score"],
        # )
        return make_response(jsonify({"mesg": "Your information has successfully captured!"}), 202)

    elif request.method == "GET" and request.is_json:
        # TODO: validate the user auth and jwt

        income_data = request.json

        # r = user_Ref.count_documents({"_id": email})
        result = {}

        # ==================== PLACEHOLDER ====================
        # validate the incoming data
        # if "regions" not in income_data:
        #     return make_response(jsonify({"mesg": "Missing region information"}), 400)
        # if len(income_data["regions"]) < 1:
        #     return make_response(jsonify({"mesg": "Missing region information"}), 400)

        # if "majors" not in income_data:
        #     return make_response(jsonify({"mesg": "Missing major information"}), 400)
        # if len(income_data["majors"]) < 1:
        #     return make_response(jsonify({"mesg": "Missing major information"}), 400)

        if validate_email(user_Ref, email):
            resource = user_Ref.find_one(
                {"_id": email}, {"_id": 0, "survey_college": 1})

            if "survey_college" in resource:
                result = {
                    "existing": int(1),
                    "regions": resource["survey_college"]["regions"],
                    "majors": resource["survey_college"]["majors"],
                    "sat_score": resource["survey_college"]["sat_score"],
                    "act_score": resource["survey_college"]["act_score"],
                }

                return make_response(jsonify({"mesg": result}), 202)

        result = {"existing": int(0)}
        return make_response(jsonify({"mesg": result}), 202)

    elif request.method == "PATCH" and request.is_json:
        # user try to append the college survey

        # TODO: check user's auth and jwt
        income_data = request.json
        # r = user_Ref.count_documents({"_id": email})

        if validate_email(user_Ref, email):
            # ==================== PLACEHOLDER ====================
            # TODO: some sort of func to append the data into db
            # append_college_survey(
            #     db,
            #     user_Ref,
            #     income_data["regions"],
            #     income_data["majors"],
            #     income_data["sat_score"],
            #     income_data["act_score"],
            # )
            return make_response(jsonify({"mesg": "Your college survey has successfully modified!"}), 202)

        return make_response(jsonify({"mesg": "Failed to modify your survey!"}), 400)

    else:
        return make_response(jsonify({"mesg": "Method is not allowed"}), 405)


# Recommendations


@app.route("/api/v1.2/users/id/<email>/<token>/<id>/recommends/scholarship",  methods=["GET"])
def getRecommend_scholarship(email, token, id):
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


@app.route("/api/v1.2/users/id/<email>/<token>/<id>/recommends/college",  methods=["GET"])
def getRecommend_college(email, token, id):
    # get scholarship recommendations
    # INPUT: email (string)
    # OUTPUT: scholarship title, amount, and deadline
    # updtUser(db, user_Ref, "hchen60@nyit.edu", "Male", "01/18/1998", "11223", "3.41",
    #      "Computer Science", race=["Asian/Pacific Islander"], ethnicity=["Chinese"],
    #      religion=["Buddhist"])

    if request.method == "GET":
        # result = filter_results(user_Ref, scholar_ref, email)
        result = "x"
        return make_response(jsonify(result), 202)
    else:
        return make_response(jsonify({"mesg": "Method is not allowed!"}), 405)


@app.route("/api/v1.2/users/id/<email>/<token>/<id>/recommends/major",  methods=["GET"])
def getRecommend_major(email, token, id):
    # get scholarship recommendations
    # INPUT: email (string)
    # OUTPUT: scholarship title, amount, and deadline
    # updtUser(db, user_Ref, "hchen60@nyit.edu", "Male", "01/18/1998", "11223", "3.41",
    #      "Computer Science", race=["Asian/Pacific Islander"], ethnicity=["Chinese"],
    #      religion=["Buddhist"])

    if request.method == "GET":
        # result = filter_results(user_Ref, scholar_ref, email)
        result = "x"
        return make_response(jsonify(result), 202)
    else:
        return make_response(jsonify({"mesg": "Method is not allowed!"}), 405)


# Bookmarks
@app.route("/api/v1.2/users/id/<email>/bookmarks/<type>/<token>/<id>",  methods=["GET", "POST", "PATCH"])
def getBookmarkDoc_all(email, type, token, id):
    if request.method == "GET" and request.is_json:
        income_data = request.json
        docType = None

        if 'docType' in income_data:
            docType = income_data['docType']

        return make_response(jsonify(getBookmarks(user_Ref, email, docType)), 202)

    elif request.method == "POST" and request.is_json:
        # users try to append a new bookmark item

        # TODO: check if this item is already exist in the record
        # so that we can avoid duplicate submission from the user

        income_data = request.json

        # validate the inputs and incoming data
        remove = False
        if len(email) < 1:
            return make_response(jsonify({"mesg": "An email is needed!"}), 400)

        if 'unique_id' not in income_data:
            return make_response(jsonify({"mesg": "Device is not supported!"}), 400)

        if 'title' not in income_data:
            return make_response(jsonify({"mesg": "A title is needed!"}), 400)

        title = income_data["title"]

        if 'action' in income_data:
            if(income_data['action'] == "remove"):
                res = removeBookmark(user_Ref, email, title)
                
                if(res):
                    return make_response(jsonify({"emsg": "Removed!"}), 202)
                else:
                    return make_response(jsonify({"emsg": "Removal failed!"}), 400)

        if 'type' not in income_data:
            return make_response(jsonify({"mesg": "A type is needed!"}), 400)

        title = income_data["title"]
        docType = income_data["type"]
        res = addBookmark(user_Ref, email, title, docType)

        if res:
            return make_response(jsonify({"emsg": "Bookmarked!"}), 202)
        else:
            return make_response(jsonify({"mesg": "Bookmark failed!"}), 400)

    elif request.method == "PATCH" and request.is_json:
        # Unbookmark a specific item
        return make_response(jsonify({"mesg": "This is a PATCH method"}), 202)

    else:
        return make_response(jsonify({"mesg": "Method not allowed!"}), 405)

# Recent Viewed (aka history)
@app.route("/api/v1.2/users/id/<email>/<token>/<id>/recent",  methods=["GET", "POST"])
def getRecentDoc(email, token, id):
    if request.method == "GET" and request.is_json:
        income_data = request.json
        numDocs = 15
        docType = None
        if 'numDocs' in income_data:
            numDocs = int(income_data['numDocs'])

        if 'docType' in income_data:
            docType = income_data['docType']

        return make_response(jsonify(getRecent(user_Ref, email, numDocs, docType)), 202)

    elif request.method == "POST" and request.is_json:
        
        income_data = request.json
        
        # validate the inputs and incoming data
        if len(email) < 1:
            return make_response(jsonify({"mesg": "An email is needed!"}), 400)

        if 'title' not in income_data:
            return make_response(jsonify({"mesg": "A title is needed!"}), 400)

        if 'type' not in income_data:
            return make_response(jsonify({"mesg": "A type is needed!"}), 400)

        if 'unique_id' not in income_data:
            return make_response(jsonify({"mesg": "Device is not supported!"}), 400)

        title = income_data["title"]
        docType = income_data["type"]

        res = addRecent(user_Ref, email, title, docType)

        if res:
            return make_response(jsonify({"mesg": "Success!"}), 202)
        else:
            return make_response(jsonify({"mesg": "Wrong email"}), 400)

    else:
        return make_response(jsonify({"mesg": "Method not allowed!"}), 405)
