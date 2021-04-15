from typing_extensions import Required
from werkzeug.datastructures import Authorization
from app import app
from flask import json, render_template, jsonify, request, make_response, redirect, url_for
import mailhandler
# from app.auth import authOutput
import string
import random
from datetime import datetime

from .recommend_model import updtUser, filter_results
import hashlib

from pymongo import MongoClient

ACTIVE_CODE_LENGTH = 64
MINS_TIL_ACTIVE_CODE_EXPIRY = 15
db = MongoClient("mongodb://localhost:27017/")
scholarDb = db.test
scholar_ref = db.test.scholarships
user_Ref = db.test.client_profile

@app.route("/")
def index():
    # print(authOutput)
    return render_template("public/index.html")


@app.route("/api/v1.2/managements/users/signup")
def signUp():
    return render_template("public/signup.html")

def generateCode():
    code = ""
    for i in range(ACTIVE_CODE_LENGTH):
        code += random.choice(string.ascii_letters + string.digits) 
    return code

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
            #For debugging purposes
            scholarDb.users.delete_one({"email" : email })
            #Check if email already exists in database
            results = scholarDb.users.find({ "email" : email })
            if(results.count() != 0):
               return redirect(url_for('signUp', error="dup"))
            #Insert user into database
            activationCode = generateCode()
            scholarDb.users.insert_one({ "email": email, "password": password, "activationCode": activationCode, "activationDate": datetime.now(), "active": 0 })
            #Send welcome email
            mailhandler.sendWelcomeEmail(email, activationCode)
            return render_template("public/thankyou.html")
        else:
            email = request.form['email']
            print(email)
            #Try to look up email in database
            results = scholarDb.users.find({ "email" : email })
            #Send user back to /forgotpassword if no email found
            if(results.count() == 0):
                return redirect(url_for('forgotpassword', error="unfound"))
            #Send reset password email to user if successful 
            mailhandler.sendResetPasswordEmail(email)
            return render_template("public/thankyou2.html")


@app.route("/api/v1.2/managements/users/<email>/login", methods=["POST"])
def login(email, paswrd):
    # user login feature
    # REQUIRMENT: a registered user
    # INPUT
    # :email (str) user's email address
    # :paswrd (str) user's password
    # OUTPUT: result of login

    if request.method == "POST":

        # validate the inputs
        len_e = len(email)
        len_p = len(paswrd)

        if len_e == 0 or len_e < 1:
            return make_response(jsonify({"mesg": "Please enter an email"}), 400)
        
        if len_p == 0 or len_p < 1:
            return make_response(jsonify({"mesg": "Please enter a password"}), 400)
        
        # check if the user's email verification is verified or not
        # if not then either request users to verify or
        # resend a new link for verification
        r = user_Ref.find_one({"email": email}).count()
        
        # if r == 1:

        # else:
        #     return "aaa"


    else:
        return make_response(jsonify({"mesg": "Method is not allowed"}), 405)


@app.route("/activate", methods=["POST", "GET"])
def activate():
    code = request.args.get('code')
    results = scholarDb.users.find({ "activationCode" : code })
    if(len(code) != ACTIVE_CODE_LENGTH or results.count() != 1):
        return "Error" #redirect(url_for('error', error="invalid"))
    activationTime = results[0]["activationDate"]
    email = results[0]["email"]
    if((datetime.now() - activationTime).total_seconds() / 60 > MINS_TIL_ACTIVE_CODE_EXPIRY):
        activationCode = generateCode()
        scholarDb.users.update_one({"email" : email}, {"$set": {"activationCode": activationCode, "activationDate": datetime.now()}})
        mailhandler.sendWelcomeEmail(email, activationCode)
        return "Code Expired, sending new code"
        
    scholarDb.users.update_one({"email" : email }, {"$set": {"active": 1}})

    return "Account activated"
    
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
    if request.method == "GET":
        result = filter_results(user_Ref, scholar_ref, email)
        return make_response(jsonify(result), 202)
    else:
        return make_response(jsonify({"mesg": "Method is not allowed!"}), 405)


