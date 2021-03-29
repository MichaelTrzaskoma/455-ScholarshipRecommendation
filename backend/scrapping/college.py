from selenium import webdriver
# from selenium.webdriver.firefox.options import Options
# from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException
from fake_useragent import UserAgent
import undetected_chromedriver as uc

import requests
import time
import random
import logging
from tqdm import tqdm

from scrap_log import writeLog_exception_noEle, write_collegeData


def exception_handler(driver, mode, ele):
    # handles the exceptions when no element(s) is found
    # INPUT
    # :driver --> web driver
    # :mode --> based on tag name/ css name/ id/ xpath
    # :ele --> name of the element
    # OUTPUT: return true if the element does exist, else false
    try:

        def elements_by_name(driver, ele):
            driver.find_elements_by_name(ele)

        def elements_by_xpath(driver, ele):
            driver.find_elements_by_xpath(ele)

        def elements_by_link_text(driver, ele):
            driver.find_elements_by_link_text(ele)

        def elements_by_partial_link_text(driver, ele):
            driver.find_elements_by_partial_link_text(ele)

        def elements_by_tag_name(driver, ele):
            driver.find_elements_by_tag_name(ele)

        def elements_by_class_name(driver, ele):
            driver.find_elements_by_class_name(ele)

        def elements_by_css_selector(driver, ele):
            driver.find_elements_by_css_selector(ele)

        def elements_by_css_selector(driver, ele):
            driver.find_elements_by_css_selector(ele)

        def element_by_id(driver, ele):
            driver.find_element_by_id(ele)

        def element_by_name(driver, ele):
            driver.find_element_by_name(ele)

        def element_by_xpath(driver, ele):
            driver.find_element_by_xpath(ele)

        def element_by_link_text(driver, ele):
            driver.find_element_by_link_text(ele)

        def element_by_partial_link_text(driver, ele):
            driver.find_element_by_partial_link_text(ele)

        def element_by_tag_name(driver, ele):
            driver.find_element_by_tag_name(ele)

        def element_by_class_name(driver, ele):
            driver.find_element_by_class_name(ele)

        def element_by_css_selector(driver, ele):
            driver.find_element_by_css_selector(ele)

        DEFAULT_MODE = {
            # multiple elements
            0: elements_by_name,
            1: elements_by_xpath,
            2: elements_by_link_text,
            3: elements_by_partial_link_text,
            4: elements_by_tag_name,
            5: elements_by_class_name,
            6: elements_by_css_selector,
            # single element
            7: element_by_id,
            8: element_by_name,
            9: element_by_xpath,
            10: element_by_link_text,
            11: element_by_partial_link_text,
            12: element_by_tag_name,
            13: element_by_class_name,
            14: element_by_css_selector
        }

        DEFAULT_MODE[mode](driver, ele)

    except NoSuchElementException:
        logging.info("An exception occurred!")
        # capture the exception in a txt file
        writeLog_exception_noEle(
            f"No such \"{ele}\" element in the page on the URL: {driver.current_url}.")
        return False

    return True


def form_graduateURL(college_url):
    # parse the college url in order to generate graduate url
    # INPUT: college url
    # OUTPUT: return graduate url

    fields = college_url.split("/")
    return "https://" + fields[2] + "/graduate-schools/" + fields[4] + "/"


def retrieve_niche_grade(section):
    # retrieve niche grade section
    # INPUT: niche grade section block
    # OUTPUT
    # :NICHE_GRADES (arr key-val pair) - e.g. [{Academic: A+}, ...]

    # expand the grading section in order to retrieve more data
    section.find_element_by_class_name("report-card__toggle").click()

    NICHE_GRADES = []
    bucket_list = section.find_elements_by_class_name(
        "ordered__list__bucket__item")

    for temp in bucket_list:
        temp_list_key = temp.find_element_by_class_name(
            "profile-grade__label").text

        # remove the word "grade", empty tab space, next line, and " minus" from the grading
        temp_list_ranking = temp.find_element_by_class_name(
            "niche__grade").text[6:]
        temp_list_ranking = temp_list_ranking.replace("\n", "")
        temp_list_ranking = temp_list_ranking.replace(" minus", "-")

        NICHE_GRADES.append({temp_list_key: temp_list_ranking})

    return NICHE_GRADES


def retrieve_college_general_info(section):
    # retrieve college info section
    # INPUT: niche grade section block
    # OUTPUT
    # :COLLEGE_DESCRIPTION (long str)
    # :COLLEGE_SITE (str)
    # :COLLEGE_ADDRESS (str)
    # :COLLEGE_TAGS (arr) - e.g. private, SAT/ACT Optional
    # :ATHLETICS_DIVISION (str)
    # :ATHLETICS_CONFERENCE (str)
    # :COLLEGE_LOCATION_TAGS (arr) - e.g. [Massachusetts, Cambridge]

    # special case when it comes to college description
    # some css name are diff
    COLLEGE_DESCRIPTION = ""
    if exception_handler(driver, 13, "bare-value"):
        COLLEGE_DESCRIPTION = driver.find_element_by_class_name(
            "bare-value").text
    else:
        COLLEGE_DESCRIPTION = driver.find_element_by_class_name(
            "premium-paragraph__text").text

    COLLEGE_SITE = section.find_element_by_class_name(
        "profile__website__link").text
    COLLEGE_ADDRESS = section.find_element_by_class_name(
        "profile__address--compact").text

    # get college tag(s)
    COLLEGE_TAGS, COLLEGE_LOCATION_TAGS = [], []
    tags = section.find_elements_by_class_name(
        "search-tags__wrap__list__tag__a")
    for tag in tags:
        COLLEGE_TAGS.append(tag.text)

    # get athletic info
    athletics = section.find_elements_by_class_name("scalar__value")

    # in case if a college doesn't have any athletics activicties
    ATHLETICS_DIVISION, ATHLETICS_CONFERENCE = "", ""
    if not athletics[0].text == "":
        ATHLETICS_DIVISION = athletics[0].text

    if not athletics[1].text == "":
        ATHLETICS_CONFERENCE = athletics[1].text

    # get college location tag(s)
    temp_location_tags = section.find_elements_by_class_name(
        "profile-breadcrumbs__item")
    for location in temp_location_tags:
        COLLEGE_LOCATION_TAGS.append(location.text)

    return COLLEGE_DESCRIPTION, COLLEGE_SITE, COLLEGE_ADDRESS, COLLEGE_TAGS, ATHLETICS_DIVISION, ATHLETICS_CONFERENCE, COLLEGE_LOCATION_TAGS


def retrieve_college_ranking(driver, section):
    ranking_detail_url = section.find_element_by_class_name(
        "expansion-link__text").get_attribute('href')

    # ######## navigate to ranking detail page ########
    driver.get(ranking_detail_url)
    
    RANKING = []
    rank_listing = driver.find_elements_by_class_name("rankings-expansion__badge")
    for item in rank_listing:
        # get the grid item title and ranking and ranking out of total #
        item_title = item.find_element_by_class_name("rankings-card__link__title").text
        item_rank = item.find_element_by_class_name("rankings-card__link__rank__number").text
        item_rank_outOF = item.find_element_by_class_name("rankings-card__link__rank").text

        # trim the unncessary info
        position = item_rank_outOF.index("of")
        item_rank_outOF = item_rank_outOF[(position + 3):]

        RANKING.append({item_title : (item_rank + "/" + item_rank_outOF)})


    # #######################################################################################################
    # ########################################### Deprecated ################################################
    # #######################################################################################################
    # main body of different ranking categories: National, State (e.g. Massachusetts), and city (e.g. Boston)
    # use selenium array here in case a college doesn't make to the national or state or city
    # NOTE: this main body page contains ads. Trim that if necessary.
    # RANK_NATIONAL, RANK_STATE, RANK_CITY = [], [], []
    # ranking_site_main_body = driver.find_elements_by_class_name(
    #     "rankings-expansion__badge-groups__with-ads")

    # # check the different ranking level
    # total_rank_grp = len(ranking_site_main_body)
    # rank_temp_counter = 0

    # # in case a college doesn't make to the national or state or city
    # if not total_rank_grp == 0:
    #     # assign ranking info
    #     for rank_item in ranking_site_main_body:
    #         # get the group without ads
    #         ranking_group = rank_item.find_element_by_class_name(
    #             "rankings-expansion__badge-group")

    #         # get the title of ranking
    #         if exception_handler(driver, 13, "rankings-expansion__badge-group-title"):
    #             ranking_title = ranking_group.find_element_by_class_name(
    #                 "rankings-expansion__badge-group-title").text

    #         # get the ranking item(s)
    #         ranking_items = ranking_group.find_elements_by_class_name(
    #             "rankings-expansion__badge")

    #         # assign the grid items. "Refresh" this var every time a different ranking is reached
    #         item_pair = []
    #         for item in ranking_items:
    #             # get the grid item title and ranking and ranking out of total #
    #             item_title = item.find_element_by_class_name(
    #                 "rankings-card__link__title").text
    #             item_rank = item.find_element_by_class_name(
    #                 "rankings-card__link__rank__number").text
    #             item_rank_outOF = item.find_element_by_class_name(
    #                 "rankings-card__link__rank").text

    #             # trim the unncessary info
    #             position = item_rank_outOF.index("of")
    #             item_rank_outOF = item_rank_outOF[(position + 3):]

    #             item_pair.append({"title": item_title, "val": (
    #                 item_rank + "/" + item_rank_outOF)})

    #         if total_rank_grp == 3 or rank_temp_counter == 0:
    #             RANK_NATIONAL = item_pair
    #             RANK_NATIONAL.append({"rank_type": "National", "national_name": ranking_title})
    #         elif total_rank_grp == 2 or rank_temp_counter == 1:
    #             RANK_STATE = item_pair
    #             RANK_STATE.append({"rank_type": "State", "state_name": ranking_title})
    #         elif total_rank_grp == 1 or rank_temp_counter == 2:
    #             RANK_CITY = item_pair
    #             RANK_CITY.append({"rank_type": "City", "city_name": ranking_title})

    #         # rank level helpler
    #         rank_temp_counter += 1
    
    return RANKING

def check(key, target):
    # admission scraping page helper
    # check if key exists in the target
    # INPUT: key (str), target (str)
    # OUTPUT: return true if key not exists in the target, else false
    return True if key not in target else False


if __name__ == "__main__":

    ROOT_URL = "https://www.niche.com/colleges/search/best-colleges/?page="
    collegeURL = []

    # ua = UserAgent()
    # userAgent = ua.random
    # print(f"User Agent: {userAgent}")

    # userProfile = "/home/hui/.config/google-chrome/Default"

    # config chrome driver options to speed up the scraping
    # co = webdriver.ChromeOptions()
    # co.headless = True
    # co.add_argument("start-maximized")
    # co.add_argument(f'user-agent={userAgent}')
    # co.add_experimental_option('excludeSwitches', ['enable-automation'])
    # co.add_argument('--incognito')
    # co.add_argument("user-data-dir={}".format(userProfile))
    # co.add_experimental_option("excludeSwitches", ["ignore-certificate-errors", "safebrowsing-disable-download-protection", "safebrowsing-disable-auto-update", "disable-client-side-phishing-detection"])
    # co.add_argument("--hide-scrollbars")
    # co.add_argument('--disable-gpu')
    # co.add_argument("--disable-extensions")
    # co.add_argument('--disable-infobars')
    # co.add_argument('--disable-javascripts')
    # co.add_argument('--no-sandbox')
    # co.add_argument('--ignore-certificate-errors')

    # config firefox profile
    # fp = webdriver.FirefoxProfile()
    # fp.set_preference("http.response.timeout", 5)
    # fp.set_preference("dom.max_scrit_run_time", 5)

    # fo = webdriver.FirefoxOptions()
    # fo.headless = True
    # fo.add_argument('--disable-extensions')
    # fo.add_argument('--disable-infobars')

    # capabilities = {
    #     'useAutomationExtension': False
    # }

    global driver
    # DRIVER_PATH = "./chromedriver_v88_2"
    # driver = webdriver.Chrome(executable_path=DRIVER_PATH, options=co)
    driver = uc.Chrome()
    # driver2 = uc.Chrome(options=co)

    # for the site's pagination
    for i in range(113):

        parsedURL = ROOT_URL + str(i)
        current_page = driver.get(parsedURL)

        # get a list of college item
        collegeItem = driver.find_elements_by_class_name(
            "search-results__list__item")
        time.sleep(random.randint(1, 6))

        # get the niche college URL
        for item in collegeItem:
            temp = item.find_element_by_class_name(
                "search-result__link").get_attribute("href")

            # avoid the duplicate ones
            if temp not in collegeURL:
                collegeURL.append(temp)
                write_collegeData(temp)

                # check if the uni has graduate academic course
                # graduate_url = form_graduateURL(temp)

                # if driver2.get(temp):
                #     write_collegeData(graduate_url)

        for temp in collegeURL:
            # get the college data in detail
            driver.get(temp)

            # ======== overall ranking list by the niche.com ========
            # section1 = driver.find_element_by_id("report-card")
            # NICHE_GRADES = retrieve_niche_grade(section1)

            # ======== college info ========
            # section2 = driver.find_element_by_id("about")
            # COLLEGE_DESCRIPTION, COLLEGE_SITE, COLLEGE_ADDRESS, COLLEGE_TAGS, ATHLETICS_DIVISION, ATHLETICS_CONFERENCE, COLLEGE_LOCATION_TAGS = retrieve_college_general_info(
            #     section2)

            # ======== ranking list ========
            # section3 = driver.find_element_by_id("rankings")
            # RANKING = retrieve_college_ranking(driver, section3)

            # back to scholasrhip detail (previous) page
            # driver.get(temp)

            # ======== Admission info ========
            section4 = driver.find_element_by_id("admissions")
            admission_detail_url = section4.find_element_by_class_name(
                "expansion-link__text").get_attribute('href')

            # ####### navigate to admission detail page ########
            driver.get(admission_detail_url)

            ADMISSION_DESCRIPTION = driver.find_element_by_class_name("bare-value").text

            admissions_statistics_grp = driver.find_element_by_id("admissions-statistics")
            acceptance_rate_grp1 = admissions_statistics_grp.find_element_by_class_name("profile__bucket--1")

            # get acceptance rate
            ACCEPTANCE_RATE = acceptance_rate_grp1.find_element_by_class_name("scalar__value").text

            # get early acceptance rate and total applicants
            ACCEPTANCE_RATE_EARLY = "N\A"
            TOTAL_APPLICANTS = 0
            acceptance_rate_grp2 = admissions_statistics_grp.find_element_by_class_name("profile__bucket--2")
            acceptance_rate_temp = acceptance_rate_grp2.find_elements_by_class_name("scalar--three")
            
            # trimmer - replace no data available with "N\A"
            if check("—", acceptance_rate_temp[0].text[30:]):
                ACCEPTANCE_RATE_EARLY = acceptance_rate_temp[0].text[30:]
            if check("—", acceptance_rate_temp[1].text[17:]):
                TOTAL_APPLICANTS = acceptance_rate_temp[1].text[17:]

            sat_grp = admissions_statistics_grp.find_element_by_class_name("profile__bucket--3")
            sat_temp1 = sat_grp.find_element_by_class_name("scalar")
            sat_temp2 = sat_grp.find_elements_by_class_name("scalar--three")

            SAT_ACCEPTANCE_SCORE_RANGE, SAT_READING_SCORE = "", ""
            temp = sat_temp1.find_element_by_class_name("scalar__value").text
            if check("—", temp):
                SAT_ACCEPTANCE_SCORE_RANGE = temp
            
            temp = sat_temp2[0].text
            print(temp)
            # SAT_READING_SCORE = sat_temp1[1].text
            # SAT_MATH_SCORE = sat_temp1[2].text
            # SAT_SUBMIT_BY_STUDENT = sat_temp1[3].text
            








            # act_grp = admissions_statistics_grp.find_element_by_class_name("profile__bucket--4")
            # act_temp = act_grp.find_elements_by_class_name("scalar__value")
            # ACT_RANGE = act_temp[0].text
            # ACT_ENG_SCORE = act_temp[1].text
            # ACT_MATH_SCORE = act_temp[2].text
            # ACT_WRITE_SCORE = act_temp[3].text
            # ACT_SUBMIT_BY_STUDENT = act_temp[4].text

            # print(ACT_RANGE + "\n" + ACT_ENG_SCORE + "\n" + ACT_MATH_SCORE + "\n" + ACT_WRITE_SCORE + "\n" + ACT_SUBMIT_BY_STUDENT)


            
            




# https://www.niche.com/graduate-schools/massachusetts-institute-of-technology/
# https://www.niche.com/colleges/massachusetts-institute-of-technology/
