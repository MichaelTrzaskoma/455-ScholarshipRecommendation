
from os import write
from pymongo import MongoClient

def writeLog_exception_noEle(item):
    # testing func: write the scraping data to a txt
    # INPUT: scraping array
    with open("scholarship_log.txt", "a+", encoding="utf-8") as writer:
        writer.write(str(item) + "\n")
        writer.write(
            "==================================================================================================\n\n")
        writer.close()


def writeLog_scrapped_data(item):
    # testing func: write the scraping data to a txt
    # INPUT: scraping array
    with open("test_output.txt", "a+", encoding="utf-8") as writer:
        for x in item:
            writer.write(str(x) + "\n")

        writer.write("======================================\n\n")
        writer.close()


def write_collegeData(item):
    with open("college_data.txt", "a+", encoding="utf-8") as writer:
        writer.write(item + "\n")
        writer.close()

# def write_collegeData_result(item):
#     with open("college_data_result.txt", "a+", encoding="utf-8") as writer:
#         writer.write(item + "\n")
#         writer.close()

client = MongoClient("mongodb://localhost:27017/")
uni_ref = client.test.colleges

def append_college(data):
    # print(data)
    uni_ref.insert_one(data)

def college_scraped(url):
    with open("college_scraped_url.txt", "a+", encoding="utf-8") as writer:
        writer.write(url + "\n")
        writer.close()
    

def read_url():
    result = ""
    with open("college_data.txt") as reader:
        result = reader.read()
        reader.close()
    return result
        