from werkzeug.datastructures import Authorization
from app import app
from flask import json, render_template, jsonify, request, make_response
# from app.auth import authOutput

from .recommend_model import updtUser

import hashlib

from pymongo import MongoClient

db = MongoClient("mongodb://localhost:27017/")
scholarDb = db.test
scholar_ref = db.test.scholarships
user_Ref = db.test.client_profile


@app.route("/")
def index():
    # print(authOutput)
    return render_template("public/index.html")


@app.route("/signup")
def signUp():
    return render_template("public/signup.html")


@app.route("/thankyou", methods=["POST", "GET"])
def thankYou():
    if(request.method == "POST"):
        page = request.form['pagePost']
        if(page == "signup"):
            email = request.form['inputEmail']
            password = request.form['inputPassword']
            # salt and hash password
            saltedPass = password + app.config['SALT_VALUE']
            hashPass = hashlib.md5(saltedPass.encode()).hexdigest()
            # TODO: Try to enter new user's information into database

            # TODO: Send user back to /signup if an email conflict exists or if DB can't be reached

            # TODO: Send confirmation email to user if successful
            return render_template("public/thankyou.html")
        else:
            email = request.form['email']
            print(email)
            # TODO: Try to look up email in database

            # TODO: Send user back to /forgotpassword if no email found or if DB can't be reached

            # TODO: Send reset password email to user if successful

            return render_template("public/thankyou2.html")


@app.route("/forgotpassword")
def forgot():
    return render_template("public/forgotpass.html")


@app.route("/api/v1.2/scholarship/view/category/general")
def view_scholarship_generalCategory():
    # view a list of scholarship general category
    # OUTPUT: (list) return a list of scholarship general category

    # NOTE: need an exception handler to handle when no resule is returned!

    result = scholarDb.scholarDirectory.find({}, {"term": 1})
    i = []
    for item in result:
        i.append(item.get("term"))

    return make_response(jsonify(i), 202)


@app.route("/api/v1.2/scholarship/view/category/<cater>")
def view_scholarshipCategory(cater):
    # view scholarship info
    # INPUT: (string) general category of the scholarships
    # OUTPUT: return a scholarship category's sub-category info

    # NOTE: need an exception handler to handle when no resule is returned!

    result = list(scholarDb.scholarDirectory.find(
        {"term": cater}, {"subTerm": 1})[0].get("subTerm"))

    return make_response(jsonify(result), 202)


@app.route("/api/v1.2/scholarship/view/category/sub/<cater>")
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


@app.route("/api/v1.2/scholarship/view/title/<scholarship_title>")
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


@app.route("/api/v1.2/usr/<email>/survey/scholarship",  methods=["POST"])
def usrSurvey_scholarship(email):
    # add user survey to it's profile
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
