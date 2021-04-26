from pymongo import MongoClient
db = MongoClient('localhost', 27017)
collegeRef = db.test.colleges

queryLoc = list(collegeRef.find({'location_tags': 'N\A'}))
querySat = list(collegeRef.find({'admission.sat.accept_score_range': 'N\A'}))
queryAct = list(collegeRef.find({'admission.act.accept_score_range': 'N\A'}))
queryMajor = list(collegeRef.find({'academic.popular_major': 'N\A'})) 
queryRanking = list(collegeRef.find({'ranking': 'N\A'})) 

print('Number of missing locations ' + str(len(queryLoc)))
print('Number of missing sat scores ' + str(len(querySat)))
print('Number of missing major ' + str(len(queryMajor)))
print('Number of missing ranking scores ' + str(len(queryRanking)))
print('Number of missing ranking scores ' + str(len(queryAct)))
