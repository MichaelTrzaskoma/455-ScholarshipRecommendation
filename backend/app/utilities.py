# This is a utilities file for the APIs and recommendation model
from datetime import datetime


def trimmer_keySlash(key):
    # trim the slash from the key
    # INPUT: key (str)
    # OUTPUT: return the key without slash(es)
    if "/" in key:
        return str(key).replace("/", " ")
    else:
        return key


def trimmer_underscore(key):
    # trim underscore from the key
    # INPUT: key (str)
    # OUTPUT: return the key without underscore
    if "_" in key:
        return str(key).replace("_", " ")
    else:
        return key


def trimmer_nextline(key):
    # trim nextline from the key
    # INPUT: key (str)
    # OUTPUT: return the key without nextline
    if "\n" in key:
        return str(key).replace("\n", "")
    else:
        return key


def trimmer_price(key):
    # trim non-price from the key
    # INPUT: key (str)
    # OUTPUT: return the key without non-price
    if "$" in key:
        i = str(key).index("$")
        return str(key)[i:]
    else:
        return key


def trimmer_price_special(key):
    # trim non-price from the key
    # INPUT: key (str)
    # OUTPUT: return the key without non-price
    if "$" in key:
        i = str(key).index("$")
        return str(key)[(i + 1):]
    else:
        return key


def trimmer_na(key):
    # trim N\A or N\\A from the key
    # INPUT: key (str)
    # OUTPUT: return the key without N\A or N\\A

    key = trimmer_nextline(key)
    double_slash = "N\\\A"
    if key == "N\A" or key == double_slash:
        return "No"

    if "N\A" in key:
        return str(key).replace("N\A", "")
    elif double_slash in key:
        return str(key).replace("N\\A", "")
    else:
        return key


def extractKey(target):
    # extract key from a dictionary
    # INPUT: target (dict)
    # OUTPUT: return a string that contains all keys from the input dict
    r = ""
    for key, val in target.items():
        temp = trimmer_underscore(key)
        temp = trimmer_nextline(temp)
        r += temp + ", "

    return r[:-2]


def arr2str(target):
    # convert arr to string
    # INPUT: target (arr)
    # OUTPUT: return a str

    l_arr = len(target)
    # print(f"{target}: {l_arr}")
    # print(type(target))
    # print()

    if l_arr == 1:
        return target

    elif l_arr == 0:
        return "None"
    else:
        return trimmer_underscore(', '.join(trimmer_nextline(e) for e in target)[:-2])


def arr2str_special(target):
    # special case of convert arr to string
    # INPUT: target (arr)
    # OUTPUT: return a str

    l_arr = len(target)

    if l_arr == 1:
        return target[0]
    elif l_arr == 0:
        return "None"
    else:
        return trimmer_underscore(', '.join(trimmer_nextline(e) for e in target))


def parseCollegeRanking(target):
    # parse college ranking dict
    # INPUT: terget (dict) contains college ranking info
    # OUTPUT: returns arr dict

    result = []
    for key, val in target.items():
        temp = trimmer_underscore(key)
        temp = trimmer_nextline(temp)
        result.append({"title": temp, "rank": val})

    return result


def check_nest1(cursor, key):
    # check a key inside from a dict
    # INPUT
    # :mongodb cursor
    # :key (str) target
    # OUTPUT: return boolean to indicate if this target key is existed

    return True if str(key) in cursor else False


def check_nest2(cursor, key1, key2):
    # check nested dict key
    # INPUT
    # :mongodb cursor
    # :key (str) target
    # OUTPUT: return boolean to indicate if this target key is existed

    if cursor == None:
        return False

    if str(key1) in cursor:
        if str(key2) in cursor[key1]:
            return True

    return False


def check_nest3(cursor, key1, key2, key3):
    # check nested dict key
    # INPUT
    # :mongodb cursor
    # :key (str) target
    # OUTPUT: return boolean to indicate if this target key is existed

    if str(key1) in cursor:
        if str(key2) in cursor[key1]:
            if str(key3) in cursor[key1][key2]:
                return True

    return False


def getBookmarks(user_Ref, email):
    if(user_Ref.count_documents({'_id': email}) == 0):
        return {"exi    sting": int(0)}

    docs = user_Ref.find_one({"_id": email}, {"_id": 0, "bookmarks": 1})

    bkmrks = []
    # print(docs)
    for doc in docs['bookmarks']:
        bkmrks.append(doc)

    return bkmrks


def addBookmark(user_Ref, email, title, lstType):
    if(user_Ref.count_documents({'_id': email}) == 0):
        return False

    docs = user_Ref.aggregate([
        {'$match': {"_id": email}},
        {'$unwind': '$bookmarks'},
        {'$match': {'bookmarks.title': title}},
        {'$project': {"bookmarks": 1, "_id": 0}}
    ])

    for doc in docs:
        return False

    user_Ref.update_one(
        {'_id': email},
        {
            '$push': {
                "bookmarks": {
                    "title": title,
                    "type": lstType,
                    "timeAdded": datetime.utcnow()
                }
            }
        }
    )
    return True


def removeBookmark(user_Ref, email, title):
    if(user_Ref.count_documents({"_id": email, "bookmarks": {"$exists": True}}) == 0):
        return False

    user_Ref.update(
        {
            "_id": email
        },
        {
            "$pull": {"bookmarks": {"title": title}}
        }
    )

    return True


def getRecent(user_Ref, email, numRes, lstType=None):
    if(user_Ref.count_documents({'_id': email, 'recent_viewed': {'$exists': True}}) == 0):
        return {"existing": int(0)}

    if(lstType == None):
        user = user_Ref.find_one({'_id': email})
        return user["recent_viewed"][-numRes:]

    docs = user_Ref.aggregate([
        {'$match': {"_id": email}},
        {'$unwind': '$recent_viewed'},
        {'$match': {'recent_viewed.type': lstType}},
        {'$project': {"recent_viewed": 1, "_id": 0}},
        {'$sort': {'recent_viewed.timeAdded': -1}}
    ])

    recent = []

    for doc in docs:
        recent.append(doc['recent_viewed'])
        if(len(recent) >= numRes):
            break

    return recent


def addRecent(user_Ref, email, title, lstType):
    if(user_Ref.count_documents({'_id': email}) == 0):
        return False
    docs = user_Ref.aggregate([
        {'$match': {"_id": email}},
        {'$unwind': '$recent_viewed'},
        {'$match': {'recent_viewed.title': title}},
        {'$project': {"recent_viewed": 1, "_id": 0}}
    ])

    update = False

    for doc in docs:
        user_Ref.update(
            {
                "_id": email,
                "recent_viewed.title": doc["recent_viewed"]["title"]
            },
            {
                '$set': {
                    "recent_viewed.$.timeAdded": datetime.utcnow()
                }
            }
        )
        update = True

    if(update):
        return True

    user_Ref.update_one(
        {'_id': email},
        {
            '$push': {
                "recent_viewed": {
                    "title": title,
                    "type": lstType,
                    "timeAdded": datetime.utcnow()
                }
            }
        }
    )
    return True


def insert_college_survey(college_ref, email, states, majors, sat='', act=''):
    # insert the college survey
    # the states and majors are requried info
    # sat and act are optional inputs

    r = college_ref.update_one({"_id": email}, {
        '$set': {
            "survey_college": {
                "regions": states,
                "majors": majors,
                "sat": sat,
                "act": act
            }
        }
    })


def append_scholarSurvey_fromCollegeSurvey(scholar_ref, email, states, majors, sat='', act=''):
    # insert the scholarship survey (partly) since there's input data from the college
    # and college && scholarship shared the same act, sat, states, and major data
    # the states and majors are requried info
    # sat and act are optional inputs

    r = scholar_ref.update_one({"_id": email}, {
        '$set': {
            "survey_scholarship": {
                "states": states,
                "major": majors,
                "sat_score": sat,
                "act_score": act
            }
        }
    })


def get_college_survey(college_ref, email):
    # retrieve college survey info from db

    r = college_ref.find_one({"_id": email}, {"_id": 0, "survey_college": 1})

    return {
        "regions": r["survey_college"]['regions'],
        "majors": r["survey_college"]['majors'],
        "sat": r["survey_college"]['sat'],
        "act": r["survey_college"]['act']
    }


def insert_major_survey(majorRef, email, avg_sal, unempl, sub, varietOfJobs, social, workEnv, triSal, triVari, triSocial, triEnv):

    majorRef.update_one({"_id": email}, {"$set": {
        'survey_major': {
            "avg_salary": avg_sal,
            "unemployRate": unempl,
            "subjects": sub,
            "variOfJobs": varietOfJobs,
            "social": social,
            "workEnv": workEnv,
            
            "triSal": triSal,
            "triVari": triVari,
            "triSocial": triSocial,
            "triEnv": triEnv
        }
    }})


def checkBookmarkStatus(clientRef, email, docType, title):
    # check if a specific scholar item is bookmarked or not

    r = clientRef.aggregate([
        {'$match': {"_id": email}},
        {'$unwind': '$bookmarks'},
        {'$match': {'bookmarks.title': title}},
        {'$match': {'bookmarks.type': docType}},
        {'$project': {"bookmarks": 1, "_id": 0}}
    ])

    x = []
        
    for i in r:
        x.append(i)

    if len(x) == 0:
        return False

    if title == x[0]['bookmarks']['title']:
        return True
    else:
        return False
    

def checkSurveyProfile(client_ref, surveyType, email):
    r = client_ref.count_documents({"_id": email, surveyType: {'$exists': True}})

    if r == 0:
        return False
    else:
        return True