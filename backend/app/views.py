from werkzeug.datastructures import Authorization
from app import app
from flask import json, render_template, jsonify, request, make_response
# from app.auth import authOutput

from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
scholarDb = client.test


@app.route("/")
def index():
    # print(authOutput)
    return render_template("public/index.html")


@app.route("/signup")
def signUp():
    return render_template("public/signup.html")


@app.route("/thankyou")
def thankYou():
    return render_template("public/thankyou.html")


@app.route("/api/v1.2/scholarship/view/category/<cater>")
def view_scholarshipCategory(cater):
    # view scholarship info
    # OUTPUT: return a scholarship category's sub-category info
    result = list(scholarDb.scholarDirectory.find(
        {"term": cater}, {"subTerm": 1})[0].get("subTerm"))

    return make_response(jsonify(result), 202)


@app.route("/api/v1.2/scholarship/view/category/sub/<cater>")
def view_scholarship_index(cater):
    # view a list of sub-category scholarship info
    # INPUT: (string) name of the category
    # OUTPUT: (array) return a list of scholarship under a specific sub-category
    indexing = [{}]
    result = scholarDb.scholarships.find(
        {"terms": {'$in': [cater]}}, {"name": 1, "amount": 1, "deadline": 1})

    for item in result:
        indexing["name"] = item.get("name")
        indexing["amount"] = item.get("amount")
        indexing["deadline"] = item.get("deadline")

    return make_response(jsonify(indexing), 202)


@app.route("/api/v1.2/scholarship/view/title/<scholarship_title>")
def view_scholarship_single(scholarship_title):
    # get a specific scholarship info
    # INPUT: (string) scholarship title
    # OUTPUT: (key-value pair) return a key-val pair of scholarship info
    scholarship = {
        "name": "",
        "amount": "",
        "deadline": "",
        "awards_available": "",
        "direct_link": "",
        "description": "",
        "contact Info": "",
    }

    result = scholarDb.scholarships.find({"name": scholarship_title}, {
        "name": 1, "amount": 1, "deadline": 1, "awards available": 1, "direct Link": 1, "description": 1, "contact Info": 1})[0]

    scholarship["name"] = result.get("name")
    scholarship["amount"] = result.get("amount")
    scholarship["deadline"] = result.get("deadline")
    scholarship["awards_available"] = result.get("awards available")
    scholarship["direct_link"] = result.get("direct Link")
    scholarship["description"] = result.get("description")
    scholarship["contact Info"] = result.get("contact Info")

    return make_response(jsonify(scholarship), 202)


# ============================================================================================================================================
# =================================================================  TEST  ===================================================================
# ============================================================================================================================================


# simulate user authe
global AUTH
AUTH = True

# email is verified when sign up the acc
global VERY
VERY = True


@app.route("/api/v1.2/test", methods=["POST", "GET"])
def T_index():
    # API TEST
    # accept: GET, POST
    # OUTPUT: return mesg string
    if request.method == "POST" or request.method == "GET":
        return make_response(jsonify({"message": f"CSCI 455/ Spring 2021 - RESTful API test index with request method of {request.method}"}), 200)
    else:
        return make_response(jsonify({"message": f"Error due to request method of: {request.method}"}), 400)


@app.route("/api/v1.2/test/users/<email>", methods=["POST", "GET"])
def getUserInfo(email):
    # API TEST
    # accept: GET, POST
    # OUTPUT: return a dummy user info

    DEFAULT_CLIENT = {
        "method": "NaN",
        "f_name": "",
        "l_name": "",
        "email": email,
        "organization": "",
        "age": 23,
        "location": "",
        "GPA": 4,
        "z_code": 11204
    }

    if request.method == "GET" and AUTH and VERY:
        DEFAULT_CLIENT = {
            "method": "GET",
            "f_name": "Hui",
            "l_name": "Chen",
            "email": email,
            "organization": "NYIT",
            "age": 23,
            "location": "Brooklyn",
            "GPA": 4,
            "z_code": 11204
        }
        return make_response(jsonify(DEFAULT_CLIENT), 200)

    elif request.method == "POST" and AUTH and VERY:

        if request.is_json:
            # verify the incoming data is in json format

            req = request.get_json()

            DEFAULT_CLIENT = {
                "method": "POST",
                "f_name": req.get("fname"),
                "l_name": req.get("lname"),
                "email": email,
                "organization": req.get("organization"),
                "age": req.get("age"),
                "location": req.get("location"),
                "GPA": req.get("gpa"),
                "z_code": req.get("zcode")
            }
            return make_response(jsonify(DEFAULT_CLIENT), 200)

    else:
        return make_response(jsonify(DEFAULT_CLIENT), 400)


@app.route("/api/v1.2/test/resources/scholarships", methods=["GET"])
def getAll_scholarships():
    # TEST API
    # accept: GET
    # e.g. Academic Major, Age, GPA, and etc
    # OUTPUT: return all scholarship category

    if request.method == "GET":
        SCHOLARSHIPS = {
            "x": 1,
            "y": 2,
            "z": 3
        }
        return make_response(jsonify(SCHOLARSHIPS), 200)
    else:
        return make_response(f"Error due to incorrect request method of {request.method}", 400)


@app.route("/api/v1.2/test/resources/scholarships/<cate>", methods=["GET"])
def get_scholarship_sub(cate):
    # TEST API
    # accept: GET
    # e.g. Computer Science, Accounting, Business, and etc
    # INPUT: sub-category name
    # OUTPUT: return all scholarship sub-category

    if request.method == "GET":
        SCHOLARSHIP = {
            "x": 1,
            "y": 2,
            "z": 3,
            "a": 4,
            "b": 5,
            "sub_cate": cate
        }
        return make_response(jsonify(SCHOLARSHIP), 200)
    else:
        return make_response(f"Error due to incorrect request method of {request.method}", 400)


@app.route("/api/v1.2/test/resources/scholarships/<cate>/index", methods=["GET"])
def get_scholarship_sub_index(cate):
    # TEST API
    # accept: GET
    # e.g. all scholarships that applicable to Computer Science ppl
    # INPUT: sub-category name
    # OUTPUT: return a scholarship sub-category table

    if request.method == "GET":
        SCHOLARSHIP = {
            "scholarship_x": 1,
            "scholarship_y": 2,
            "scholarship_z": 3,
            "scholarship_a": 4,
            "scholarship_b": 5,
            "sub_cate": cate
        }
        return make_response(jsonify(SCHOLARSHIP), 200)
    else:
        return make_response(f"Error due to incorrect request method of {request.method}", 400)


@app.route("/api/v1.2/test/users/<email>/college", methods=["GET"])
def get_recom_college(email):
    # TEST API
    # accept: GET
    # e.g. all scholarships that applicable to Computer Science ppl
    # INPUT: email
    # OUTPUT: return all recommended college

    if request.method == "GET" and AUTH and VERY:
        COLLEGE = {
            "recommended_x": 1,
            "recommended_y": 2,
            "recommended_z": 3,
            "recommended_a": 4,
            "recommended_b": 5,
            "sub_cate": email
        }
        return make_response(jsonify(COLLEGE), 200)
    else:
        return make_response(f"Error due to incorrect request method of {request.method}", 400)
