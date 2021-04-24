from pymongo import MongoClient
db = MongoClient('localhost', 27017)
majorRef = db.test.majors

#figure insert method
def insertMajor():

    majorRef.insertOne({

        'major':
        'major_desc':
        'class_list': []
        'subjects': [] #For recommendation
        'job_list': []
        'med_salary': #For recommendation
        'emp_rate': #For recommendation
        'autonomy': #For recommendation
        'job_variety': #For recommendation
        'social_interaction': #For recommendation
        'work_environment': #For recommendation
        'binary' 
    })
        
    