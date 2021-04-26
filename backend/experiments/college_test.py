from pymongo import MongoClient
db = MongoClient('localhost', 27017)
collegeRef = db.test.colleges

queryLoc = list(collegeRef.find({'location_tags': 'N\A'}))
querySat = list(collegeRef.find({'admission.sat.accept_score_range': 'N\A'}))
queryAct = list(collegeRef.find({'admission.act.accept_score_range': 'N\A'}))
queryMajor = list(collegeRef.find({'academic.popular_major': 'N\A'})) 
queryRanking = list(collegeRef.find({'ranking': 'N\A'})) 
queryAct_Sat = list(collegeRef.find({'admission.act.accept_score_range': 'N\A', 'admission.sat.accept_score_range': 'N\A'}))

print('Number of missing locations ' + str(len(queryLoc)))
print('Number of missing sat scores ' + str(len(querySat)))
print('Number of missing major ' + str(len(queryMajor)))
print('Number of missing ranking scores ' + str(len(queryRanking)))
print('Number of missing ranking scores ' + str(len(queryAct)))
print('Number of missing act and sat scores ' + str(len(queryAct_Sat)))

#print(querySat[1]['ranking'].keys())

def uniqueSatRange():
    uniqueSat = []
    querySatHave = list(collegeRef.find({'admission.sat.accept_score_range': {'$ne':'N\A'}}))
    
    for sat in querySatHave:
        uniqueSat.append(sat['admission']['sat']['accept_score_range'])
    
    uniqueSat = set(uniqueSat)
    print(len(uniqueSat))

def uniqueState ():
    uniqueState = []
    queryLocHave = list(collegeRef.find({'location_tags': {'$ne':'N\A'}}))

    
    for loc in queryLocHave:
        if len(loc['location_tags']) > 1:
            uniqueState.append(loc['location_tags'][0])
    
    uniqueState = sorted(set(uniqueState))
    print(uniqueState)

uniqueSatRange()
uniqueState()