# This is a utilities file for the APIs and recommendation model
import datetime

MAX_ENTRIES_FOR_RECENT = 15

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

    if l_arr == 1:
        return target[0]
    elif l_arr == 0:
        return "None"
    else:
        return trimmer_underscore(', '.join(trimmer_nextline(e) for e in target)[:-2])
    

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
    if(user_Ref.count_documents({'_id': email, 'bookmarks': {'$exists': True}}) == 0):
        return {"existing": int(0)}

    user = user_Ref.find_one({'_id':email})

    return user["bookmarks"]


def addBookmark(user_Ref, email, title, lstType):
    if(user_Ref.count_documents({'_id': email}) == 0):
        return False

    user_Ref.update_one(
        {'_id':email},
        {
            '$push': {
                "bookmarks": {
                    "title": title,
                    "type": lstType,
                    "timeAddded": datetime.utcnow()
                }
            }
        }
    )
    return True


def getRecent(user_Ref, email):
    if(user_Ref.count_documents({'_id': email, 'recent_viewed': {'$exists': True}}) == 0):
        return {"existing": int(0)}

    user = user_Ref.find_one({'_id':email})

    return user["recent_viewed"][-MAX_ENTRIES_FOR_RECENT:]


def addRecent(user_Ref, email, title, lstType):
    if(user_Ref.count_documents({'_id': email}) == 0):
        return False
    user_Ref.update_one(
        {'_id':email},
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
                "regions": states,
                "majors": majors,
                "sat": sat,
                "act": act
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

