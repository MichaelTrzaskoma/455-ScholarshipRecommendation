from pymongo import MongoClient

db = MongoClient('localhost', 27017)

user_Ref = db.client_profile


def create_ser_profile(serEmail,
                        gender,
                        dob,
                        zipC,
                        gpa,
                        major='',
                        race='',
                        ethnicity='',
                        religion='',
                        dissabilities='',
                        sat='',
                        address1='',
                        address2='',
                        address3=''):

    list1 = [gender]

    user_Ref[serEmail].insert_one({
        'Email': serEmail,
        'Gender': gender,
        'Date of Birth': dob,
        'Zip': zipC,
        'GPA': gpa,
        'Major': major,
        'Religion': religion,
        'Race': race,
        'Ethnicity': ethnicity,
        'Dissabilities': dissabilities,
        'SAT Score': sat,
        'Address 1': address1,
        'Address 2': address2,
        'Address 3': address3,
        'Binary': binary,
        'Terms': list1
    })
