from datetime import datetime
from datetime import date
from pyzipcode import ZipCodeDatabase
from pymongo import MongoClient

# CosSim Calc
from numpy import dot
from numpy.linalg import norm

zcdb = ZipCodeDatabase()

#db = MongoClient('localhost', 27017)
 
# This file is gonna be imported by views.py
# therefore, a db will be called in views.py
# the db obj will be passed from the views.py
# ===================================
#scholar_ref = db.test.scholarships
# user_Ref = db.test.client_profile
# table_Ref = db.collection("Index Table").document("Terms")
# refList = table_Ref.get().to_dict().get('Terms')
MAX_ENTRIES_FOR_RECENT = 15

def updtUser(
        db,
        user_Ref,
        email,
        gender,
        age,
        state=[],
        gpa,
        major=[],
        race=[],
        ethnicity=[],
        religion=[],
        dissabilities=[],
        sat='',):
    # Used to initiation user or update their information, specify when using optional attributes
    list1 = [gender]
    list1.append(catAge(age))
    list1.append(catGPA(gpa))
   
    majorUpdt = list(major)
    
    if major !=[]:
        majorUpdt = catMajor(major)

    list2 = [state, race, religion, dissabilities, ethnicity, majorUpdt]
    for i in range(len(list2)):
        if list2[i] != []:
            list1.extend(list2[i])
        

    if (sat != ''):
        list1.append(catSat(sat))

    binary = setBin(db, list1)

    user_Ref.insert_one({
        "_id": userEmail,
        "email": userEmail,
        "paswrd": "place holder 2",
        "jwt": "place holder 3",
        # max 15 items
        "recent_viewed": [
            {
                "type": "scholarship",
                "title": "place holder 4",
            },
            {
                "type": "college",
                "title": "place holder 5",
            },
            {
                "type": "major",
                "title": "place holder 6",
            },
        ],
        # no limit to bookmark item
        "bookmarks": [
            {
                "type": "scholarship",
                "title": "place holder 7",
            },
            {
                "type": "college",
                "title": "place holder 8",
            },
            {
                "type": "major",
                "title": "place holder 9",
            },
        ],
        "survey_scholarship": {
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
            "terms": list1,
            "binary": binary, 
        },
        "survey_college": {
            "x": "place holder 16",
        },
        "survey_major": {
            "y": "place holder 17",
        },
    })


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
    
    if major !=[]:
        majorUpdt = catMajor(major)

    print(majorUpdt)
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

    user_Ref.update(
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

def getBookmarks(user_Ref, email):
    if(user_Ref.count_documents({'_id': email, 'bookmarks': {'$exists': True}}) == 0):
        return "[]"
    user = user_Ref.find_one(
        {'_id':email}
        )
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
        return "[]"
    user = user_Ref.find_one(
        {'_id':email}
        )
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


# def binaryConvert():
# refers to a list

# def updateAccount():
# update all fields? not too sure

#Not utilized 
def catState(zipC):
    zipcode = zcdb[zipC]
    state = abrevConv[zipcode.state]
    return state


abrevConv = {
    'AL': 'Alabama',
    'AK': 'Alaska',
    'AS': 'American Samoa',
    'AZ': 'Arizona',
    'AR': 'Arkansas',
    'CA': 'California',
    'CO': 'Colorado',
    'CT': 'Connecticut',
    'DE': 'Delaware',
    'DC': 'District of Columbia',
    'FL': 'Florida',
    'GA': 'Georgia',
    'GU': 'Guam',
    'HI': 'Hawaii',
    'ID': 'Idaho',
    'IL': 'Illinois',
    'IN': 'Indiana',
    'IA': 'Iowa',
    'KS': 'Kansas',
    'KY': 'Kentucky',
    'LA': 'Louisiana',
    'ME': 'Maine',
    'MD': 'Maryland',
    'MA': 'Massachusetts',
    'MI': 'Michigan',
    'MN': 'Minnesota',
    'MS': 'Mississippi',
    'MO': 'Missouri',
    'MT': 'Montana',
    'NE': 'Nebraska',
    'NV': 'Nevada',
    'NH': 'New Hampshire',
    'NJ': 'New Jersey',
    'NM': 'New Mexico',
    'NY': 'New York',
    'NC': 'North Carolina',
    'ND': 'North Dakota',
    'MP': 'Northern Mariana Islands',
    'OH': 'Ohio',
    'OK': 'Oklahoma',
    'OR': 'Oregon',
    'PA': 'Pennsylvania',
    'PR': 'Puerto Rico',
    'RI': 'Rhode Island',
    'SC': 'South Carolina',
    'SD': 'South Dakota',
    'TN': 'Tennessee',
    'TX': 'Texas',
    'UT': 'Utah',
    'VT': 'Vermont',
    'VI': 'Virgin Islands',
    'VA': 'Virginia',
    'WA': 'Washington',
    'WV': 'West Virginia',
    'WI': 'Wisconsin',
    'WY': 'Wyoming'
}


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


def catIndex(db, word):
    # Finds the index of the word based on a table generated from the driver
    # Input -> string, the word
    # output -> int, the index
    subCatCursor = db.test.subcatlist.find(
        {"subCat": word}, {"subCat": 1, "_id": 0})

    refListDict = subCatCursor[0]
    refList = refListDict.get("subCat")
    ind = refList.index(word)
    return ind


def setBin(db, list):
    binaryInitial = '0' * 810  # Changed to 810 to match scholarship binary length
    usrList = splitStr(binaryInitial)
    for i in range(len(list)):
        ind = catIndex(db, list[i])
        usrList[ind] = "1"
    binaryStr = toString(usrList)
    return binaryStr


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


def filter_results(user_Ref, scholar_ref, userId):
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
        if binCompare(userBin, scholarBin) == False:
            value = comparison(scholarBin, userBin)
            if(value >= filterVal):
                scholarInfo = {
                    'Name': str(curr_scholar.get('name')),
                    'Amount': int(parseAmount(curr_scholar.get('amount'))),
                    'Deadline': str(curr_scholar.get('deadline')),
                    'Val': value,
                }
                filteredScholar.append(scholarInfo)
                filteredScholar.sort(key=sortKey, reverse=True)
    return filteredScholar


def binCompare(user_bin, scholar_bin):
    # Method to compare and see hard conditions
    # Input - > 2 strings, user binary, scholarship binary
    # Output - > boolean, true if good, false if bad
    userList = splitInt(user_bin)
    scholarList = splitInt(scholar_bin)
    for y in range(len(userList)):
        if userList[y] < scholarList[y]:
            return False
    return True


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
