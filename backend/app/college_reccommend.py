from pymongo import MongoClient
from numpy import dot
from numpy.linalg import norm
from numpy import isnan
import numpy as np

db = MongoClient('localhost', 27017)
user_Ref = db.test.client_profile
college_ref = db.test.colleges

def updtCollegeSurvey(
                db,
                email,
                state = [],
                sat = '',
                act = '',
                major = [],
                ):
    
    
    binary = binaryCollege(major)

    user_Ref.update(
        {'_id':email},
        {'$set':
            {
           'survey_college':{
                "regions": state,
                "major": major,
                "sat_score": sat,
                "act_score": act,
                "binary": binary, 
           } 
        }}
    )

def binaryCollege(major):
    binary = [0]* 212
    finalIndList = []
    
    for i in range(len(major)):
        indList = []
        if major[i] == 'Accounting':
            indList = [0, 58, 71]

        if major[i] == 'Agriculture':
            indList = [27, 129, 183]

        if major[i] == 'Anthropology':
            indList = [29, 200]

        if major[i] == 'Art':
            indList = [35, 50, 76, 139, 172, 205]

        if major[i] == 'Biology':
            indList = [31, 66, 95, 106, 115, 164]

        if major[i] == 'Business':
            indList = [10, 61, 82, 83, 146, 183]

        if major[i] == 'Chemistry':
            indList = [7, 95, 171]

        if major[i] == 'Communications':
            indList = [6, 56, 78, 119, 178, 202]

        if major[i] == 'Computer Science':
            indList = [34, 63, 73, 121, 128, 153, 197, 198]

        if major[i] == 'Cosmetology':
            indList = [100]

        if major[i] == 'Criminal Justice':
            indList = [2, 65, 96, 180, 188]

        if major[i] == 'Culinary Arts':
            indList = [147, 196 ]

        if major[i] == 'Dental':
            indList = [145, 194]

        if major[i] == 'Design':
            indList = [1, 78, 88, 108, 117, 136, 158, 165, 203, 207, 208]

        if major[i] == 'Economics':
            indList = [19, 59, 191]

        if major[i] == 'Education':
            indList = [3, 54, 67, 75, 80, 98, 103, 110, 114, 122, 124, 151, 157, 160, 167, 181, 
            186, 190, 193, 201, 205, 209]

        if major[i] == 'Engineering':
            indList = [25, 36, 37, 39, 46, 52, 57, 60, 62, 69, 77, 90, 93, 101, 104, 105, 109, 
            116, 123, 131, 138, 140, 143, 153, 163, 168, 176, 179, 187, 197, 199, 204, 210]

        if major[i] == 'English':
            indList = [28, 54, 97, 169]

        if major[i] == 'Environmental Science':
            indList = [20, 53, 136, 140, 168]

        if major[i] == 'Film':
            indList = [4, 86]

        if major[i] == 'Finance':
            indList = [0, 150, 161]

        if major[i] == 'Food and Nutrition':
            indList = [91, 195]

        if major[i] == 'Foreign Language':
            indList = [40]

        if major[i] == 'Health':
            indList = [23, 38, 31, 43, 51, 124, 170, 177, 186]

        if major[i] == 'Health Care':
            indList = [85, 89, 94, 135]

        if major[i] == 'History':
            indList = [30, 50, 125, 126, 151]

        if major[i] == 'Information Technology':
            indList = [24, 64, 73, 118, 141, 198]

        if major[i] == 'International Relations':
            indList = [18, 61, 81, 154]

        if major[i] == 'Legal Studies':
            indList = [74, 189]

        if major[i] == 'Math':
            indList = [22, 127, 132, 193]

        if major[i] == 'Music':
            indList = [9, 44, 55, 102, 122, 126, 137, 159, 185]

        if major[i] == 'Nursing':
            indList = [17, 45, 47, 166, 177, 182, 209]

        if major[i] == 'Philosophy':
            indList = [13, 156]

        if major[i] == 'Photography':
            indList = [4, 84, 144]

        if major[i] == 'Physical Therapy':
            indList = [12, 107, 206]

        if major[i] == 'Physics':
            indList = [16, 101, 142]

        if major[i] == 'Political Science':
            indList = [11, 192]

        if major[i] == 'Protective Services':
            indList = [65, 96, 188]

        if major[i] == 'Psychology':
            indList = [5, 42, 72, 79, 92, 94, 112, 120, 133, 162, 174]

        if major[i] == 'Public Health':
            indList = [23, 170, 186]

        if major[i] == 'Public Policy':
            indList = [26, 70]

        if major[i] == 'Religious Studies':
            indList = [15, 87, 167, 184]
            
        if major[i] == 'Social Services':
            indList = [38, 99, 120, 130, 134]

        if major[i] == 'Sports Management':
            indList = [33, 148]

        if major[i] == 'Veterinary':
            indList = [49, 113]

        finalIndList.extend(indList)

    if finalIndList != []:
        for j in range(len(finalIndList)):
            ind = finalIndList[j]
            binary[ind] = 1
    
    return binary

def comparison(user_bin, input_bin):
    # For the CosSim comparison
    # Input -> two strings, user binary and scholarship binary
    # Output -> float value, result of CosSim
    userList = user_bin
    inputList = input_bin
    cos_sim = dot(userList, inputList)/(norm(userList)*norm(inputList))
    return cos_sim

def collegeFilter(userEmail):
    #do something

    userCursor = user_Ref.find(
        {"_id": userEmail}, {"_id": 0})
    userProf = userCursor[0]
    userStates = userProf.get('survey_college').get('regions') 
    userMajor = userProf.get('survey_college').get('major')
    userBin = userProf.get('survey_college').get('binary')
    userSat = userProf.get('survey_college').get('sat_score')
    userAct = userProf.get('survey_college').get('act_score')

    initialQuery = []

    if userStates != [] and userSat != '' and userAct != '':
        for i in range(len(userStates)):
            subQuery = list(college_ref.find(
                {'location_tags': userStates[i], 
                '$or':[{'admission.sat.accept_score_range': 'N\A'}, {'admission.sat.minSat': {'$lte': userSat}},
                {'admission.act.accept_score_range': 'N\A'}, {'admission.act.minAct': {'$lte': userAct}}]}))
            initialQuery = initialQuery + subQuery

    elif userStates != [] and userSat != '' and userAct == '':
        for i in range(len(userStates)):
            subQuery = list(college_ref.find(
                {'location_tags': userStates[i], 
                '$or':[{'admission.sat.accept_score_range': 'N\A'}, {'admission.sat.minSat': {'$lte': userSat}}]}))
            initialQuery = initialQuery + subQuery

    elif userStates != [] and userSat == '' and userAct != '':
        for i in range(len(userStates)):
            subQuery = list(college_ref.find(
                {'location_tags': userStates[i], 
                '$or':[{'admission.act.accept_score_range': 'N\A'}, {'admission.act.minAct': {'$lte': userAct}}]}))
            initialQuery = initialQuery + subQuery 

    elif userStates!= [] and userSat == '' and userAct == '':
        for i in range(len(userStates)):
            subQuery = list(college_ref.find(
                {'location_tags': userStates[i]}))
            initialQuery = initialQuery + subQuery
    
    elif userStates == [] and userSat !='' and userAct !='':
        initialQuery = list(college_ref.find(
            {'$or':[{'admission.sat.accept_score_range': 'N\A'}, {'admission.sat.minSat': {'$lte': userSat}},
                {'admission.act.accept_score_range': 'N\A'}, {'admission.act.minAct': {'$lte': userAct}}]}))

    elif userStates == [] and userSat !='' and userAct =='':
        initialQuery = list(college_ref.find(
            {'$or':[{'admission.sat.accept_score_range': 'N\A'}, {'admission.sat.minSat': {'$lte': userSat}}]}))

    elif userStates == [] and userSat == '' and userAct !='':
        initialQuery = list(college_ref.find(
            {'$or':[{'admission.act.accept_score_range': 'N\A'}, {'admission.act.minAct': {'$lte': userAct}}]}))


    seen = set()
    queryRes = []
    for collegeDict in initialQuery:
        if  collegeDict not in queryRes:
            queryRes.append(collegeDict)

    finalCollegeList = []
    if list(userMajor) !=[]:
        count = 0
        for k in range(len(queryRes)):
            collegeBin = queryRes[k].get('binary')
            #print(queryRes[k])
            #print(collegeBin)
            if collegeBin is not None:
                value = comparison(userBin, collegeBin)
                if np.isnan(value) == False and value != 0:
                    collegeInfo = {
                        'Name': queryRes[k].get('name'),
                        'Val': value
                    }
                    finalCollegeList.append(collegeInfo)
        finalCollegeList.sort(key=sortKey, reverse=True)
        return finalCollegeList
    else:
        for l in range(len(queryRes)):
            collegeInfo = {
                'Name': queryRes.get('name'),
                'Val': 'N\A'
            }
            finalCollegeList.append(collegeInfo)
        return finalCollege(List)


def sortKey(e):
    # The key for sorting the list or results
    # Input -> dictionary
    # Output -> value of specified field
    return e['Val']

#updtCollegeSurvey(db, 'mtrzasko@nyit.edu', act = '20', major =['Math'])
#print(collegeFilter('mtrzasko@nyit.edu'))
