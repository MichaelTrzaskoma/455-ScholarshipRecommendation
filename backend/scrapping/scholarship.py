# https://medium.com/@praneeth.jm/running-chromedriver-and-selenium-in-python-on-an-aws-ec2-instance-2fb4ad633bb5
# ChromeDriver 87.0.4280.88

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.common.exception import NoSuchElementException
import time
import random
import logging
from tqdm import tqdm

# log the exception when an element is not found
from scrap_log import writeLog_exception_noEle

from pymongo import MongoClient
################# Mongo ####################

# Directory towards the mongo db
# Modify <UserName>, <Password>, <ClusterName> with db credentials
# client = MongoClient("mongodb+srv://<UserName>:<Password>@testcluster.otnrl.mongodb.net/<ClusterName>?retryWrites=true&w=majority")
client = MongoClient("mongodb://localhost:27017/")
scholarDb = client.test


# Old filter lists
#categoryList = ['Academic Major', 'Age', 'Ethnicity', 'Gender', 'Grade Point Average', 'Physical Disabilities', 'Race', 'Religion', 'Residence State', 'SAT Score', 'Military Affiliation']
#subCatList = ['Business', 'Nursing/Nurse Practitioner', 'Psychology/Counseling', 'Biology', 'Engineering', 'Education', 'Communications', 'Accounting', 'Finance', 'Criminal Justice', 'Anthropology', 'Computer Science', 'English', 'Economics', 'Political Science']

filter1 = ["Academic Major", "ACT Score", "Military Affiliation"]
filter2 = ["Age 13", "Age 14", "Age 15", "Age 15", "Age 16"]
######################################################

logging.basicConfig(format='%(asctime)s - %(message)s', level=logging.INFO)

HOME_URL = "https://www.scholarships.com"
ROOT_URL = "https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory"
LOGIN_URL = "https://www.scholarships.com/login"

USERNAME = "csci426@protonmail.com"
PASSWORD = "2QAaF5hjc$@k"


def simulate_login():
    # simulation of login
    driver.get(LOGIN_URL)

    # simulate login
    driver.find_element_by_id("Email").send_keys(USERNAME)
    driver.find_element_by_name("Password").send_keys(PASSWORD)
    driver.find_element_by_xpath('//input[@type="submit"]').click()


def exception_handler(driver, mode, ele):
    # handles the exceptions when no element(s) is found
    # INPUT
    # :driver --> web driver
    # :mode --> based on tag name/ css name/ id/ xpath
    # :ele --> name of the element
    # OUTPUT: return true if the element does exist, else false
    try:
        DEFAULT_MODE = {
            # multiple elements
            0: driver.find_elements_by_name(ele),
            1: driver.find_elements_by_xpath(ele),
            2: driver.find_elements_by_link_text(ele),
            3: driver.find_elements_by_partial_link_text(ele),
            4: driver.find_elements_by_tag_name(ele),
            5: driver.find_elements_by_class_name(ele),
            6: driver.find_elements_by_css_selector(ele),
            # single element
            7: driver.find_element_by_id(ele),
            8: driver.find_element_by_name(ele),
            9: driver.find_element_by_xpath(ele),
            10: driver.find_element_by_link_text(ele),
            11: driver.find_element_by_partial_link_text(ele),
            12: driver.find_element_by_tag_name(ele),
            13: driver.find_element_by_class_name(ele),
            14: driver.find_element_by_css_selector(ele)
        }
        DEFAULT_MODE.get(mode, False)
    except NoSuchElementException:
        logging.info("An exception occurred!")
        # capture the exception in a txt file
        writeLog_exception_noEle(f"No such \"{ele}\" element in the page on the URL: {driver.current_url}.")
        return False
    
    return True


def search_level_tbl():
    # search scholarship categoery table
    # OUTPUT: seleiunm <a> list
    
    if exception_handler(driver, 7, "ullist"):
        # locate the table of scholarship
        root_tbl = driver.find_element_by_id("ullist")

        if exception_handler(driver, 4, "a"):
            # locate the element by categories
            a_tag_tbl = root_tbl.find_elements_by_tag_name("a")
            return a_tag_tbl
    
    return None


def scraping_levels(sele_ele):
    # scarping first level category
    # INPUT: selenium obj <-- scholarship tbl
    # OUTPUT: url and title (category)

    level_link = []
    level_title = []

    for a_tag in sele_ele:
        cate_link = a_tag.get_attribute("href")
        cate_title = a_tag.text
        level_link.append(cate_link)
        level_title.append(cate_title)

    return level_link, level_title


def get_scholar_tbl():
    # level 3 scholarship table
    # OUTPUT: # OUTPUT: selenium <tr> list

    link = []
    title = []

    if exception_handler(driver, 12, "tbody"):
        # locate the info of scholarship
        scholar_tbl = driver.find_element_by_tag_name("tbody")

        if exception_handler(driver, 4, "tr"):
            tr = scholar_tbl.find_elements_by_tag_name("tr")
            for t in tr:

                if exception_handler(driver, 12, "td a"):
                    x = t.find_element_by_tag_name("td a")
                    link.append(x.get_attribute("href"))
                    title.append(x.text)
                    # print(x.get_attribute("href"))

            return link, title
    
    return None, None


def scraping_scholar_tbl(tr_ele):
    # get the item inside the scholar table on level 3
    # INPUT: selenium <tr> ele

    scholar_tit = []
    scholar_link = []

    for item in tr_ele:
        # nested tag here, locate <td> then <a>
        temp = driver.find_element_by_tag_name("td a")

        if temp:
            L3_link = temp.get_attribute("href")
            scholar_tit.append(temp.text)
            scholar_link.append(L3_link)
            # print(temp.text, ":\n", L3_link, "\n\n")
            # sleep to ensure IP address is not blocked
            time.sleep(random.randint(1, 6))

    return scholar_link, scholar_tit


def get_specific():
    # get specific scholarship detail
    # OUTPUT: scholarship attributes

    test = []
    if exception_handler(driver, 13, "award-info-row"):
        award_info = driver.find_element_by_class_name("award-info-row")

        if exception_handler(driver, 4, "h3"):
            temp = award_info.find_elements_by_tag_name("h3")

            # get general info
            amount = temp[0].text
            deadline = temp[1].text
            ava = temp[2].text
            ava_wrd, ava_num = ava.split(":")

            if exception_handler(driver, 14, ".award-info-action-items [href]"):
                # get direct apply link
                temp = driver.find_element_by_css_selector(
                    ".award-info-action-items [href]")
                temp = temp.get_attribute("href")
                # need to parse here since the site will open another window event with js
                spliter = temp.split(",")
                dir_link = spliter[0][26:-1]

                if exception_handler(driver, 13, "scholdescrip"):
                    # get abstract scholarship description
                    description = driver.find_element_by_class_name("scholdescrip").text

                    if exception_handler(driver, 7, "ulScholDetails"):
                        # scholarship contact info
                        temp2 = driver.find_element_by_id("ulScholDetails").text
                        lines = temp2.splitlines()
                        flag = False
                        contact_info = ""

                        for item in lines:
                            if (item == "Scholarship Committee"):
                                # special case:
                                # need to remove useless scholarship contact info
                                flag = True
                                continue

                            if (flag):
                                contact_info = contact_info + item + "\n"

                        # print(amount, "\n", deadline, "\n", ava_num, "\n", dir_link, "\n", description, "\n", contact_info, "\n\n")

                        test.append(amount)
                        test.append(deadline)
                        test.append(ava_num)
                        test.append(dir_link)
                        test.append(description)
                        test.append(contact_info)

                        test_write2file(test)
                        return amount, deadline, ava_num, dir_link, description, contact_info
    
    return None, None, None, None, None, None


def test_write2file(item):
    # testing func: write the scraping data to a txt
    # INPUT: scraping array
    with open("test_output.txt", "a+", encoding="utf-8") as writer:
        for x in item:
            writer.write(str(x) + "\n")

        writer.write("======================================\n\n")
        writer.close()


########################### Update Insert Method for Mongo ###########################################



def addScholarship(name, amount, deadline, ava, dir_link, description,
                   contact_info, binary):
    # Inputs new scholarship into the mongo
    # Input -> All attributes of scholarship
    # Output -> None
    scholarDb.scholarships.insert_one(
        {
            'name': name,
            'amount': amount,
            'deadline': deadline,
            'awards available': ava,
            'direct Link': dir_link,
            'description': description,
            'contact Info': contact_info,
            'binary': binary,
            'terms': []
        }
    )


def updateTerms(schol_name, term):
    # Updates the term array in mongo
    # Input-> id to locate the scholarship, term
    # Output-> None
    termCursor = scholarDb.scholarships.find(
        {"name": schol_name}, {"terms": 1, "_id": 0})
    termDict = termCursor[0]
    termList = termDict.get("terms")
    if term not in termList:
        termList.append(term)

    scholarDb.scholarships.update_one({"name": schol_name}, {"$set": {"terms": termList},
                                                             "$currentDate": {"lastModified": True}})


def split(word):
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


def catIndex(word):
    # Finds the index of the word based on a table generated from the driver
    # Input -> string, the word
    # output -> int, the index
    subCatCursor = scholarDb.subcatlist.find(
        {"subCat": word}, {"subCat": 1, "_id": 0})
    refListDict = subCatCursor[0]
    refList = refListDict.get("subCat")
    # print(type(refList))
    ind = refList.index(word)
    return ind


def updateBin(schol_name, word):
    # Updates the binary based on the word in mongo
    # Input -> int, string, the id of the scholarship and the term
    # Output -> none
    # Modify this
    scholarCursor = scholarDb.scholarships.find(
        {"name": schol_name}, {"binary": 1, "_id": 0})
    scholarBinDict = scholarCursor[0]
    scholarBin = scholarBinDict.get("binary")
    ind = catIndex(word)
    list = split(scholarBin)
    list[ind] = "1"
    binaryStr = toString(list)
    scholarDb.scholarships.update_one({"name": schol_name}, {"$set": {"binary": binaryStr},
                                                             "$currentDate": {"lastModified": True}})


# String to generate the inital binary array of 807  bits because I'm lazy to type it out =D
binaryInitial = '0' * 807

############# If any filtering needed ##################
def charCheck(string):
    # Checks the string and changes / to &
    # Input -> String
    # Output -> Changed string if at all
    charList = split(string)
    for i in range(len(charList)):
        if charList[i] == '/':
            charList[i] = ' & '
    newString = ''
    newString = newString.join(charList)
    return newString
#######################################################


try:
    # config firefox profile
    # fp = webdriver.FirefoxProfile()
    # fp.set_preference("http.response.timeout", 5)
    # fp.set_preference("dom.max_scrit_run_time", 2)
    # fp.set_preference("javascript.enabled", False)

    fo = webdriver.ChromeOptions()
    # set headless so that no browser is displayed
    fo.headless = True
    fo.add_argument('--disable-extensions')
    fo.add_argument('--disable-infobars')
    fo.add_argument('--disable-javascript')

    # create a driver
    global driver

    # Remove path if not needed
    path = './chromedriver_v88'
    driver = webdriver.Chrome(executable_path=path, options=fo)

    # simulation login
    simulate_login()

    # open the root page
    driver.get(ROOT_URL)

    # scraping level 1
    level_1_tbl = search_level_tbl()
    
    # general test except case
    # this will always be true
    if level_1_tbl != None:
        L1_link, L1_title = scraping_levels(level_1_tbl)

    ################ Subcat Reference Maker  ##########################
    # Following snipbit creates a table of subcategories in mongo db used
    # for reference of indexs in binary string

    # FIRST TIME SCRAPPING SHOULD RUN BELOW BLOCK OF CODE!

    # subCatList1 = []
    # for x in range(0, len(L1_link)):
    #    if "Military Affiliation" == L1_title[x]:
    #        subCatList1.append(L1_title[x])
    #        # special case, no sub-category
    #        continue
    # New

    #    driver.get(L1_link[x])

    # scraping level 2
    #    level2_tbl = search_level_tbl()
    #    L2_link, L2_title = scraping_levels(level2_tbl)
    #    subCatList1.extend(L2_title)

    # scholarDb.subcatlist.insert_one({
    #        'subCat':subCatList1
    #    })
    # exit()

    ##################################################################
    # counter = 1
    for x in range(0, len(L1_link)):
        if L1_title[x] in filter1:
            # special case, no sub-category
            #  or already scrapped
            continue

        # OLD: Used to only work with specific categories
        # if categoryList.count(L1_title[x]) == 0:
        #    continue

        driver.get(L1_link[x])

        # scraping level 2
        level2_tbl = search_level_tbl()
        L2_link, L2_title = scraping_levels(level2_tbl)

        for y in range(0, len(L2_link)):
            # OLD: Used for starting at a specific point
            # if (L1_title[x] == 'Academic Major') & (subCatList.count(L2_title[y]) == 0):
            #    continue

            if L2_title[y] in filter2:
                continue

            driver.get(L2_link[y])
            L3_link, L3_title = get_scholar_tbl()

            # except trapped, skip this one
            if L3_link == None:
                continue

            # OLD: Used for limiting amount of scholarships per sub category
            # if len(L3_link) > 15:
            #    limit = 15
            # else:
            limit = len(L3_link)

            print("\n")
            logging.info(f"Scrapping at: {L1_title[x]} - {L2_title[y]}")
            # counter = counter + 1

            # scraping for level 3
            for z in tqdm(range(0, limit)):
                # used to check for illegal characters
                #L3_title[z] = charCheck(L3_title[z])

                # if z == 511:
                #     continue

                ################# RECENTLY Updated #################
                # If statement for if scholarship exists
                # Updated for mongo
                if scholarDb.scholarships.count_documents({'name': L3_title[z]}, limit=1) == 0:
                    driver.get(L3_link[z])
                    amount, deadline, ava, dir_link, description, contact_info = get_specific()

                    if amount != None:
                        addScholarship(L3_title[z], amount, deadline, ava,
                                    dir_link, description, contact_info,
                                    binaryInitial)
                    else:
                        continue

                # Updates term list and binary string, now with scholarship name
                updateTerms(L3_title[z], L2_title[y])
                updateBin(L3_title[z], L2_title[y])
                ###################################################

finally:
    try:
        driver.close()
    except:
        pass
