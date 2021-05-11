from datetime import datetime, date
# from datetime import date
# from pymongo import MongoClient

# CosSim Calc
import numpy as np
from numpy import dot
from numpy.linalg import norm


#db = MongoClient('localhost', 27017)
 
# This file is gonna be imported by views.py
# therefore, a db will be called in views.py
# the db obj will be passed from the views.py
# ===================================
#scholar_ref = db.test.scholarships
# user_Ref = db.test.client_profile
# table_Ref = db.collection("Index Table").document("Terms")
# refList = table_Ref.get().to_dict().get('Terms')

#Focus on this method 
def updtScholarSurvey(
        db,
        user_Ref,
        email,
        gender,
        age,
        gpa,
        state=[],
        sat='',
        act='',
        major=[],
        race=[],
        ethnicity=[],
        religion=[],
        dissabilities=[]):

    list1 = [gender]
    list1.append(catAge(age))
    list1.append(catGPA(gpa))
    
    majorUpdt = list(major)
    
    if majorUpdt !=[]:
        majorUpdt = catMajor(majorUpdt)

    # print(majorUpdt)
    list2 = [state, race, religion, dissabilities, ethnicity, majorUpdt]
    for i in range(len(list2)):
        if list2[i] != []:
            list1.extend(list2[i])
        

    if (sat != ''):
        if(catSat != ''):
            list1.append(catSat(sat))

    if (act != ''):
        if(catAct != ''):
            list1.append(catAct(act))

    binary = setBin(db, list1)

    user_Ref.update_one(
        {'_id':email},
        {'$set':
            {
           'survey_scholarship':{
                "gender": gender,
                "age": age,
                "states": state,
                "gpa": gpa,
                "major": major,
                "race": race,
                "ethnicity": ethnicity,
                "religion": religion,
                "disabilities": dissabilities,
                "sat_score": sat,
                "act_score": act,
                "terms": list1,
                "binary": binary, 
           } 
        }}
    )






def catGPA(gpa):
    str = ' '
    gpa = float(gpa)
    if (gpa >= 1.0) & (gpa <= 2.0):
        str = 'Minimum Grade Point Average From 1.0 to 2.0'
    elif (gpa >= 2.1) & (gpa <= 2.5):
        str = 'Minimum Grade Point Average From 2.1 to 2.5'
    elif (gpa >= 2.6) & (gpa <= 3.0):
        str = 'Minimum Grade Point Average From 2.6 to 3.0'
    elif (gpa >= 3.1) & (gpa <= 3.5):
        str = 'Minimum Grade Point Average From 3.1 to 3.5'
    elif (gpa >= 3.6) & (gpa <= 4.0):
        str = 'Minimum Grade Point Average From 3.6 to 4.0'
    return str


def catAge(age):
    # birth = datetime.strptime(age, "%m/%d/%Y")
    # today = date.today()
    # age = today.year - birth.year - ((today.month, today.day) <
    #                                  (birth.month, birth.day))
    intAge=int(age)
    string = ''
    if intAge < 13:
        string = ("Age 13")
    elif intAge > 30:
        string = ("Age Greater Than 30")
    else:
        string = ("Age " + str(age))
    return string

def catSat(sat):
    str = ''
    if (float(sat) >= 400) & (float(sat) <= 1000):
        str = 'SAT Scores From 400 To 1,000'
    elif (float(sat) >= 1001) & (float(sat) <= 1200):
        str = 'SAT Scores From 1,001 To 1,200'
    elif (float(sat) >= 1201) & (float(sat) <= 1400):
        str = 'SAT Scores From 1,201 To 1,400'
    elif (float(sat) >= 1401) & (float(sat) <= 1600):
        str = 'SAT Scores From 1,401 To 1,600'
    else:
        return str
    return str

def catAct(act):
    str = ''
    intAct = int(act)
    if (intAct>= 10) & (intAct <=15):
        str ='ACT Scores From 10 To 15'
    elif (intAct>= 16) & (intAct <=20):
        str ='ACT Scores From 10 To 15'
    elif (intAct>= 21) & (intAct <=25):
        str ='ACT Scores From 10 To 15'
    elif (intAct>= 26) & (intAct <=30):
        str ='ACT Scores From 10 To 15'
    elif (intAct>= 31):
        str ='ACT Scores Greater Than 31'
    else:
        return str
    return str
   
def catMajor(major):
    for i in range(len(major)):
        if major[i] == 'Agriculture':
            major[i] = 'Agriculture/Agribusiness'

        if major[i] == 'Culinary Arts':
            major[i] = 'Culinary Science'
        
        if major[i] == 'Dental':
            major[i] = 'Dentistry'

        if major[i] == 'Environmental Science':
            major[i] = 'Environmental Studies'
        
        if major[i] == 'Film':
            major[i] = 'Film, Television & Interactive Media'
        
        if major[i] == 'Food and Nutrition':
            major[i] = 'Food Science & Human Nutrition'
        
        if major[i] == 'Foreign Language':
            major[i] = 'Foreign Languages/Cultures'

        if major[i] == 'Health':
            major[i] = 'Health Education & Promotion'
        
        if major[i] == 'Health Care':
            major[i] = 'Health Care Administration'
        
        if major[i] == 'Information Technology':
            major[i] = 'Information Systems'
        
        if major[i] == 'International Relations':
            major[i] = 'International Affairs'
        
        if major[i] == 'Legal Studies':
            major[i] = 'Law School/Legal Studies'
        
        if major[i] == 'Math':
            major[i] = 'Mathematics'
        
        if major[i] == 'Mechanics':
            major[i] = 'Mechanical Engineering'
        
        if major[i] == 'Medical':
            major[i] = 'Medicine'
        
        if major[i] == 'Nursing':
            major[i] = 'Nursing/Nurse Practitioner'

        if major[i] == 'Physical Therapy':
            major[i] = 'Physical Therapy/Rehabilitation'
        
        if major[i] == 'Protective Services':
            major[i] = 'Police/Law Enforcement'
        
        if major[i] == 'Psychology':
            major[i] = 'Psychology/Counseling'
        
        if major[i] == 'Social Services':
            major[i] = 'Social Work'

        if major[i] == 'Sports Management':
            major[i] = 'Sport Management'

        if major[i] == 'Veterinary':
            major[i] = 'Veterinary Medicine'
        
    return major


def splitStr(word):
    # splits the string to array
    # input -> string
    # output -> char array
    return [char for char in word]


def toString(list):
    # converts list to string
    # Input -> list
    # output -> array
    str = ""
    return (str.join(list))


def catIndex(db, listIn):
    # Finds the index of the word based on a table generated from the driver
    # Input -> string, the word
    # output -> int, the index
    subCatCursor = list(db.test.subcatlist.find(
        {}, {"subCat": 1, "_id": 0}))

    refListDict = subCatCursor[0]
    refList = refListDict.get("subCat")
    hasIndexs = []
    for i in range(len(listIn)):
        if listIn[i] in refList:
            ind = refList.index(listIn[i])
            hasIndexs.append(ind)
    
    return hasIndexs


def setBin(db, listIn):
    binaryInitial = [0] * 810  # Changed to 810 to match scholarship binary length
    indexs = catIndex(db, listIn)
    #usrList = splitStr(binaryInitial)
    for i in range(len(indexs)):
        ind = indexs[i]
        binaryInitial[ind] = 1
    #binaryStr = toString(usrList)
    #print(binaryInitial)
    return binaryInitial


# Updates the binary based on the word in firestore
# Input -> int, string, the id of the scholarship and the term
# Output -> none

# listA = table_Ref.get().to_dict().get('Terms')
# print(setBin(['Accounting']))
# updtUser('some email', 'Male', '5/11/1999', '10308', '3.6', sat='1400')
# updtUser("hchen60@nyit.edu", "Male", "01/18/1998", "11223", "3.41",
#          "Computer Science", "Asian/Pacific Islander", "Chinese",
#          "Buddhist")


#########################################     METHODS    #######################
# Methods for binary filtering


def splitInt(word):
    # Split method
    # Input -> String, ideally the binary string
    # Output -> integer list to be used for CosSim
    stringlist = [char for char in word]
    intlist = [int(i) for i in stringlist]
    return intlist


def comparison(user_bin, input_bin):
    # For the CosSim comparison
    # Input -> two strings, user binary and scholarship binary
    # Output -> float value, result of CosSim
    queryList = splitInt(user_bin)
    inputList = splitInt(input_bin)
    cos_sim = dot(queryList, inputList)/(norm(queryList)*norm(inputList))
    return cos_sim


def sortKey(e):
    # The key for sorting the list or results
    # Input -> dictionary
    # Output -> value of specified field
    return e['Val']


def recommend_scholarship(user_Ref, scholar_ref, userId):
    # For filtereing after a query is done, returns a list of id's that we can loop through to pull info of those scholarships
    # Input -> Query generator object, string user id, filtering float number
    # Output -> List of strings, these are id's that can be used to pull information
    filterVal = 0.20  # Need to do more testing for best value
    userCursor = user_Ref.find(
        {"_id": userId}, {"_id": 0})
    userProf = userCursor[0]
    userTerms = userProf.get('survey_scholarship').get('terms')
    userBin = userProf.get('survey_scholarship').get('binary')

    queryTotal = []

    # Pulls any scholarship that contains a term that the User Profile has
    for i in range(len(userTerms)):
        subQuery = list(scholar_ref.find(
            {'terms': userTerms[i]}, {'terms': 0}))
        queryTotal = queryTotal + subQuery

    # Removes duplates, O(n^2)
    seen = set()
    queryRes = []
    for d in queryTotal:
        t = tuple(sorted(d.items()))
        if t not in seen:
            seen.add(t)
            queryRes.append(d)

    # Binary Comparision
    filteredScholar = []
    for i in range(len(queryRes)):
        curr_scholar = queryRes[i]
        scholarBin = curr_scholar.get('binary')
        # Need to change method for check set to false for now
        value = binCompare(userBin, scholarBin)
        if(value[0] >= filterVal):
            scholarInfo = {
                'Name': str(curr_scholar.get('name')),
                'Amount': int(parseAmount(curr_scholar.get('amount'))),
                'Deadline': str(curr_scholar.get('deadline')),
                'Val': value[0],
                'Frac': value[1],
            }
            filteredScholar.append(scholarInfo)
    filteredScholar.sort(key=sortKey, reverse=True)
    return filteredScholar


def binCompare(user_bin, scholar_bin):
    # 11 if statements for check
    #gender, age, states, gpa, major, race, ethnicity, religion, disabilities, sat, act,
    # Method to compare and see hard conditions
    # Input - > 2 strings, user binary, scholarship binary
    # Output - > boolean, true if good, false if bad
    containsList = []
    for i in range(len(user_bin)):
        if user_bin[i] != 0:
            containsList.append(i)
    scholar_bin = list(scholar_bin)
    count = 0
   
    scholar_bin = [int(i) for i in scholar_bin]
    
    diff = np.subtract(user_bin, scholar_bin)
    #print(diff)
    #print(scholar_bin)
    #print(containsList)

    #print(containsList)
    for i in range(len(containsList)):
        index = containsList[i]
        #Gender
        if index >= 486 and index <= 489 and scholar_bin[index] != 1 and -1 in diff[486:489]:
            return [0, 'N\A']
        #age
        elif index >= 177 and index <= 195 and scholar_bin[index] != 1 and -1 in diff[177:195]:
            return [0, 'N\A']
        #states
        elif index >= 598 and index <= 658 and scholar_bin[index] != 1 and -1 in diff[598:658]:
            return [0, 'N\A']
        #gpa
        elif index >= 490 and index <= 494 and scholar_bin[index] != 1 and -1 in diff[490:494]:
            return [0, 'N\A']
        #major
        elif index >= 0 and index <= 171 and scholar_bin[index] != 1 and -1 in diff[0:171]:
            return [0, 'N\A']
        #race
        elif index >= 558 and index <= 564 and scholar_bin[index] != 1 and -1 in diff[558:564]:
            return [0, 'N\A']
        #ethnicity
        elif index >= 380 and index <= 483 and scholar_bin[index] != 1 and -1 in diff[380:483]:
            return [0, 'N\A']
        #religion
        elif index >= 565 and index <= 597 and scholar_bin[index] != 1 and -1 in diff[565:597]:
            return [0, 'N\A']
        #disabilities
        elif index >= 510 and index <= 557 and scholar_bin[index] != 1 and -1 in diff[510:557]:
            return [0, 'N\A']
        #sat
        elif index >= 659 and index <= 662 and scholar_bin[index] != 1 and -1 in diff[659:662]:
            return [0, 'N\A']
        #act
        elif index >= 172 and index <= 176 and scholar_bin[index] != 1 and -1 in diff[172:176]:
            return [0, 'N\A']
        elif scholar_bin[index] == 1:
            count = count + 1
        #print('hi')
    val = count/len(containsList)
    frac = str(count) + '/' + str(len(containsList))
    return [val, frac]

def parseAmount(txt):
    if "$" in txt: 
        if "," in txt:
            txt = txt.replace(",", "")
        return txt[1:]
    else:
        return 0

# from pymongo import MongoClient

# db = MongoClient("mongodb://localhost:27017/")
# scholarDb = db.test
# scholar_ref = db.test.scholarships
# user_Ref = db.test.client_profile

#updtUser(db,user_Ref,"mtrzasko@nyit.edu", "Male", "5/11/1999", 10308, "3.0")
# print(filter_results(user_Ref, scholar_ref, 'mtrzasko@nyit.edu'))
# Test run of compare
#   print(filter_results('hchen60@nyit.edu'))
