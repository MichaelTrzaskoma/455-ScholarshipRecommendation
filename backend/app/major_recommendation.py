from pymongo import MongoClient
from numpy import dot
from numpy.linalg import norm
from itertools import groupby

db = MongoClient('localhost', 27017)
user_Ref = db.test.client_profile
#22 length bit string for users 
#print(len(majorValues))

def updtMajorSurvey(
                db,
                email,
                income,
                unemp,
                autom,
                subj,
                varJobs,
                social,
                workEnv
                ):

    list1 = []
    list1.append(catIncome(income))
    list1.append(catUnemp(unemp))
    list1.extend(catAutom(autom))
    list1.extend(catVarJobs(varJobs))
    list1.extend(catSocial(social))
    list1.extend(catWorkEnv(workEnv))
    list1.extend(subj)

    binary = setBin(db, list1)
    #binary method here 
    user_Ref.update(
        {'_id':email},
        {'$set':
            {
           'survey_major':{
                "income": income,
                "unemp": unemp,
                "autom": autom,
                "varJobs": varJobs,
                "social": social,
                "workEnv": workEnv, 
                "binary":binary
           } 
        }}
    )

def catIncome(income):
    if income.find(','):
        income = income.replace(',', '')
    if income.find('$'):
        income = income.replace('$', '')

    if float(income) <= 57000:
        return '<57,000'
    elif (float(income) > 57000) and (float(income) <= 64000):
        return '57,000 - 64,000'
    elif (float(income) > 64000) and (float(income) <= 71000):
        return '64,000 - 71,000'
    elif(float(income) > 64000):
        return '71,000<'
    
def catUnemp(unemp):
    if unemp.find('%'):
        unemp = unemp.replace('%', '')
    if float(unemp) <= 3.7:
        return '<3.7'
    elif (float(unemp) > 3.7) and (float(unemp) <= 4):
        return '3.7 - 4'
    elif (float(unemp) > 4) and (float(unemp) <= 4.5):
        return '4 - 4.5'
    elif(float(unemp) > 4.5):
        return '4.5<'

def catAutom(autom):
    if autom == 'Yes':
        return ['Autonomous']
    elif autom == 'No':
        return ['Not Autonomous']
    else:
        return []

def catVarJobs(varJobs):
    if varJobs == 'Low':
        return ['Low Job Variety']
    elif varJobs == 'Medium':
        return ['Med Job Variety'] 
    elif varJobs == 'High':
        return ['High Job Variety']
    else:  
        return []
    

def catSocial(social):
    if social == 'Yes':
        return ['High Social Interaction']
    elif social == 'No':
        return ['Low Social Interaction'] 
    elif social == 'Job Dependant':
        return ['Low Social Interaction', 'High Social Interaction']
    else:
        return[]

def catWorkEnv(workEnv):
    if workEnv == 'Indoor':
        return [workEnv]
    elif workEnv == 'Outdoor':
        return [workEnv] 
    elif workEnv == 'Job Dependant':
        return ['Indoor', 'Outdoor']
    else:
        return[]


def setBin(db, list):
    binaryInitial = [0] * 22   # Changed to 22 to match major binary length
    indexes = catMajorIndex(db, list)
    for i in range(len(indexes)):
        ind = indexes[i]
        binaryInitial[ind] = 1
    return binaryInitial


def catMajorIndex(db, listIn):
    # Finds the index of the word based on a table generated from the driver
    # Input -> string, the word
    # output -> int, the index
    subCatCursor = list(db.test.majorCatList.find({}, {"majorCatList": 1, "_id": 0}))
    refListDict = subCatCursor[0]
    refList = refListDict.get("majorCatList")
    hasIndexs = []
    for i in range(len(listIn)):
        if listIn[i] in refList:
            ind = refList.index(listIn[i])
            hasIndexs.append(ind)
    return hasIndexs


def filter_majors (userId):
    userCursor = list(user_Ref.find(
        {"_id": userId}, {"_id": 0}))
    userProf = userCursor[0]
    userBin = userProf.get('survey_major').get('binary')
    majorEval = []
    majorCursor = list(db.test.majors.find({}, {"_id": 0}))
    for i in range(len(majorCursor)):
        currMajor = majorCursor[i]
        majorBin = currMajor.get('binary')
        value = comparison(majorBin, userBin)
        majorInfo = {
            'Major': str(currMajor.get('major')),
            'Category': str(currMajor.get('category')),
            'Val': value,
            }
        majorEval.append(majorInfo)
    
        #need major groupings 
        
    majorEval.sort(key=sortKey, reverse=True)
    #returns the group most fitting 
    return majorEval

def sortKey(e):
    # The key for sorting the list or results
    # Input -> dictionary
    # Output -> value of specified field
    return e['Val']

def comparison(user_bin, input_bin):
    # For the CosSim comparison
    # Input -> two strings, user binary and scholarship binary
    # Output -> float value, result of CosSim
    userList = user_bin
    inputList = input_bin
    cos_sim = dot(userList, inputList)/(norm(userList)*norm(inputList))
    return cos_sim



#updtMajorSurvey(db, 'mtrzasko@nyit.edu', '60000', '4', 'Yes', ['Math'], 'High', 'Yes', 'Outdoor')
print(filter_majors('mtrzasko@nyit.edu'))
