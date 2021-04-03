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
    rank_listing = driver.find_elements_by_class_name(
        "rankings-expansion__badge")
    for item in rank_listing:
        # get the grid item title and ranking and ranking out of total #
        item_title = item.find_element_by_class_name(
            "rankings-card__link__title").text
        item_rank = item.find_element_by_class_name(
            "rankings-card__link__rank__number").text
        item_rank_outOF = item.find_element_by_class_name(
            "rankings-card__link__rank").text

        # trim the unncessary info
        position = item_rank_outOF.index("of")
        item_rank_outOF = item_rank_outOF[(position + 3):]

        RANKING.append({item_title: (item_rank + "/" + item_rank_outOF)})

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
    target = str(target)
    key = str(key)
    return True if target.find(key) else False


def retrieve_admission_statistics(driver, section):
    # scraping the college admission detail
    # INPUT
    # :driver (selenium webdriver obj)
    # :section (selenium ele obj) - admission section of block from parent page
    # OUPUT: return an admission dict

    admission_detail_url = section.find_element_by_class_name(
        "expansion-link__text").get_attribute('href')

    # ####### navigate to admission detail page ########
    driver.get(admission_detail_url)

    ADMISSION_DESCRIPTION = driver.find_element_by_class_name(
        "bare-value").text

    # admissing statistics group
    admissions_statistics_grp = driver.find_element_by_id(
        "admissions-statistics")
    acceptance_rate_grp1 = admissions_statistics_grp.find_element_by_class_name(
        "profile__bucket--1")

    # get acceptance rate
    ACCEPTANCE_RATE = acceptance_rate_grp1.find_element_by_class_name(
        "scalar__value").text

    # get early acceptance rate and total applicants
    ACCEPTANCE_RATE_EARLY, TOTAL_APPLICANTS = "N\A", "N\A"
    acceptance_rate_grp2 = admissions_statistics_grp.find_element_by_class_name(
        "profile__bucket--2")
    acceptance_rate_temp = acceptance_rate_grp2.find_elements_by_class_name(
        "scalar--three")

    # trimmer - replace no data available with "N\A"
    if check("—", acceptance_rate_temp[0].text[30:]):
        ACCEPTANCE_RATE_EARLY = acceptance_rate_temp[0].text[30:]
    if check("—", acceptance_rate_temp[1].text[17:]):
        TOTAL_APPLICANTS = acceptance_rate_temp[1].text[17:]

    # get SAT statistics3
    sat_grp = admissions_statistics_grp.find_element_by_class_name(
        "profile__bucket--3")
    sat_temp1 = sat_grp.find_element_by_class_name("scalar")
    sat_temp2 = sat_grp.find_elements_by_class_name("scalar--three")

    SAT_ACCEPTANCE_SCORE_RANGE, SAT_READING_SCORE, SAT_MATH_SCORE, SAT_SUBMIT_BY_STUDENT = "N\A", "N\A", "N\A", "N\A"
    # locate the sat overall range score element
    temp = sat_temp1.find_element_by_class_name("scalar__value").text

    # pre-processing those do not have the SAT scores appliable
    if check("—", temp):
        SAT_ACCEPTANCE_SCORE_RANGE = temp

    if check("—", sat_temp2[0].text[11:]):
        SAT_READING_SCORE = sat_temp2[0].text[11:]

    if check("—", sat_temp2[1].text[11:]):
        SAT_MATH_SCORE = sat_temp2[1].text[8:]

    if check("—", sat_temp2[2].text[11:]):
        SAT_SUBMIT_BY_STUDENT = sat_temp2[2].text[23:]

    # get ACT statistics
    act_grp = admissions_statistics_grp.find_element_by_class_name("profile__bucket--4")
    act_temp1 = act_grp.find_element_by_class_name("scalar")
    act_temp2 = act_grp.find_elements_by_class_name("scalar--three")

    ACT_RANGE, ACT_ENG_SCORE, ACT_MATH_SCORE, ACT_WRITE_SCORE, ACT_SUBMIT_BY_STUDENT = "N\A", "N\A", "N\A", "N\A", "N\A"
    # locate the act overall range score element
    temp = act_temp1.find_element_by_class_name("scalar__value").text

    # pre-processing those do not have the ACT scores appliable
    if check("—", temp):
        ACT_RANGE = temp

    if check("—", act_temp2[0].text[11:]):
        ACT_ENG_SCORE = act_temp2[0].text[11:]

    if check("—", act_temp2[1].text[8:]):
        ACT_MATH_SCORE = act_temp2[1].text[8:]

    if check("—", act_temp2[2].text[11:]):
        ACT_WRITE_SCORE = act_temp2[2].text[11:]

    if check("—", act_temp2[3].text[23:]):
        ACT_SUBMIT_BY_STUDENT = act_temp2[3].text[23:]

    # admission deadline group
    admission_deadline_grp = driver.find_element_by_id("admissions-deadlines")

    # deadline group
    deadline_grp = admission_deadline_grp.find_element_by_class_name("profile__bucket--1")

    # locate deadline detail
    deadline_temp1 = deadline_grp.find_element_by_class_name("scalar")
    deadline_temp2 = deadline_grp.find_elements_by_class_name("scalar--three")

    ADMISSION_DEADLINE_DATE, DEADLINE_EARLY_DECISION, DEADLINE_EARLY_ACTION, EARLY_OFFERE_DATE, EARLY_OFFER_ACTION = "N\A", "N\A", "N\A", "N\A", "N\A"

    # locate the deadline exactly date
    temp = deadline_temp1.find_element_by_class_name("scalar__value").text

    # pre-processing those do not have the ACT scores appliable
    if check("—", temp):
        ADMISSION_DEADLINE_DATE = temp

    if check("—", deadline_temp2[0].text[23:]):
        DEADLINE_EARLY_DECISION = deadline_temp2[0].text[23:]

    if check("—", deadline_temp2[1].text[21:]):
        DEADLINE_EARLY_ACTION = deadline_temp2[1].text[21:]

    if check("—", deadline_temp2[2].text[21:]):
        EARLY_OFFERE_DATE = deadline_temp2[2].text[21:]

    if check("—", deadline_temp2[3].text[19:]):
        EARLY_OFFER_ACTION = deadline_temp2[3].text[19:]
    
    # locate the application details
    admission_application_grp = admission_deadline_grp.find_element_by_class_name("profile__bucket--2")

    APPLIC_FEE, APPLIC_WEBSITE, APPLIC_COMM_APP, APPLI_ACCEPT_COALITION_APP = "N\A", "N\A", "N\A", "N\A"
    applic_temp1 = admission_deadline_grp.find_element_by_class_name("scalar")
    appli_temp2 = admission_application_grp.find_element_by_class_name("profile__website__link").get_attribute("href")
    appli_temp3 = admission_application_grp.find_elements_by_class_name("scalar--three")
    temp = applic_temp1.find_element_by_class_name("scalar__value").text

    if check("—", temp):
        APPLIC_FEE = temp
    
    if check("—", appli_temp2):
        APPLIC_WEBSITE = appli_temp2
    
    if check("—", appli_temp3[0].text[18:]):
        APPLIC_COMM_APP = appli_temp3[0].text[18:]
    
    if check("—", appli_temp3[1].text[21:]):
        APPLI_ACCEPT_COALITION_APP = appli_temp3[1].text[21:]
    
    # admission requirements
    HIGHSCHO_GPA, HIGHSCHO_RANK, HISHSCHO_TRANSCRIPT, COLLEGE_PRE_COURSE, SAT_OR_ACT, RECOMMENDATION = "N\A", "N\A", "N\A", "N\A", "N\A", "N\A"
    
    admission_requirement_grp = driver.find_element_by_id("admissions-requirements")
    requirement_temp = admission_requirement_grp.find_elements_by_class_name("fact__table__row__value")

    if check("—", requirement_temp[0].text):
        HIGHSCHO_GPA = requirement_temp[0].text

    if check("—", requirement_temp[1].text):
        HIGHSCHO_RANK = requirement_temp[1].text

    if check("—", requirement_temp[2].text):
        HISHSCHO_TRANSCRIPT = requirement_temp[2].text

    if check("—", requirement_temp[3].text):
        COLLEGE_PRE_COURSE = requirement_temp[3].text

    if check("—", requirement_temp[4].text):
        SAT_OR_ACT = requirement_temp[4].text

    if check("—", requirement_temp[5].text):
        RECOMMENDATION = requirement_temp[5].text

    # admission poll results
    poll_temp = admission_requirement_grp.find_element_by_class_name("profile__bucket--2")
    POLL_RESULT1, POLL_RESULT2 = "N\A", "N\A"

    temp = poll_temp.find_element_by_class_name("poll__single__percent__label").text
    if check("—", temp):
        POLL_RESULT1 = temp
    
    poll_temp = admission_requirement_grp.find_element_by_class_name("profile__bucket--3")
    temp = poll_temp.find_element_by_class_name("poll__single__percent__label").text
    if check("—", temp):
        POLL_RESULT2 = temp
    
    Admission = {
        "description": str(ADMISSION_DESCRIPTION),
        "acceptance": {
            "rate": str(ACCEPTANCE_RATE),
            "rate_early": str(ACCEPTANCE_RATE_EARLY),
        },
        "total_applicants": str(TOTAL_APPLICANTS),
        "sat": {
            "accept_score_range": str(SAT_ACCEPTANCE_SCORE_RANGE),
            "reading_score": str(SAT_READING_SCORE),
            "math_score": str(SAT_MATH_SCORE),
            "submite_by_student": str(SAT_SUBMIT_BY_STUDENT)
        },
        "act": {
            "accept_score_range": str(ACT_RANGE),
            "eng_score": str(ACT_ENG_SCORE),
            "math_score": str(ACT_MATH_SCORE),
            "write_score": str(ACT_WRITE_SCORE),
            "submite_by_student": str(ACT_SUBMIT_BY_STUDENT)
        },
        "deadline": {
            "date": str(ADMISSION_DEADLINE_DATE),
            "early_decision": str(DEADLINE_EARLY_DECISION),
            "early_action": str(DEADLINE_EARLY_ACTION),
            "early_offer_date": str(EARLY_OFFERE_DATE),
            "early_action": str(EARLY_OFFER_ACTION)
        },
        "application": {
            "fee": str(APPLIC_FEE),
            "website": str(APPLIC_WEBSITE),
            "comm_app": str(APPLIC_COMM_APP),
            "accept_coalition_app": str(APPLI_ACCEPT_COALITION_APP)
        },
        "requirements": {
            "highscho_gpa": str(HIGHSCHO_GPA),
            "highscho_rank": str(HIGHSCHO_RANK),
            "highscho_transcript": str(HISHSCHO_TRANSCRIPT),
            "uni_precourse": str(COLLEGE_PRE_COURSE),
            "sat_or_act": str(SAT_OR_ACT),
            "recommendation": str(RECOMMENDATION),
            "poll_uni_care_them": str(POLL_RESULT1),
            "poll_uni_care_individual": str(POLL_RESULT2)
        }
    }
    return Admission


def retrieve_cost_data(driver, section):
    cost_detail_url = section.find_element_by_class_name("expansion-link__text").get_attribute("href")
    # navigate to the cost detail page
    driver.get(cost_detail_url)

    # there are two element named id with "cost", so need to process them
    cost_info_temp = driver.find_elements_by_id("cost")
    cost_grp = cost_info_temp[1]
    cost_temp = cost_grp.find_element_by_class_name("profile__bucket--3")
    
    NET_COST = "N\A"
    temp = cost_temp.find_element_by_class_name("scalar__value").text
    # parse the unnecessary info
    position = temp.index(" / ")
    if check("—", temp[:position]):
        NET_COST = temp[:position]
    
    # locate financial loan and aid urls
    student_loan_url, financial_aid_url = "N\A", "N\A"
    loan_aid_temp = cost_grp.find_element_by_class_name("profile__bucket--4")
    loan_aid_urls = loan_aid_temp.find_elements_by_class_name("expansion-link__text")
    student_loan_url = loan_aid_urls[0].get_attribute("href")
    financial_aid_url = loan_aid_urls[1].get_attribute("href")

    # navigate to student loan page
    driver.get(student_loan_url)

    LOAN_AVG_AMOUNT, LOAN_TAKE_OUT, LOAN_DEFAULT_RATE = "N\A", "N\A", "N\A"
    loan_grp = driver.find_element_by_id("about-student-loans")
    loan_info_block = loan_grp.find_element_by_class_name("profile__bucket--1")
    loan_infos = loan_info_block.find_elements_by_class_name("scalar__value")

    position = loan_infos[0].text.index(" / ")
    if check("—", loan_infos[0].text[:position]):
        LOAN_AVG_AMOUNT = loan_infos[0].text[:position]
    
    if check("—", loan_infos[1].text):
        LOAN_TAKE_OUT = loan_infos[1].text
    
    # there are words like "\n11%" in the string
    temp = loan_infos[2].text[:3].replace("\n", "")
    if check("—", temp):
        LOAN_DEFAULT_RATE = temp
    
    # navigate back to the cost detail page
    driver.get(cost_detail_url)

    # locate net price breakdown
    NET_PRICE, AVG_TOTAL_AID_AWARD, STUDENT_RECEIVE_AID, NET_PRICE_CALCULATE_URL = "N\A", "N\A", "N\A", "N\A"
    net_price_grp = driver.find_element_by_id("net-price")
    net_price_temp = net_price_grp.find_element_by_class_name("profile__bucket--1")
    net_price_items = net_price_temp.find_elements_by_class_name("scalar__value")

    temp = net_price_items[0].text
    position = temp.index(" / ")
    if check("—", temp[:position]):
        NET_PRICE = temp[:position]
    
    temp = net_price_items[1].text
    position = temp.index(" / ")
    if check("—", temp[:position]):
        AVG_TOTAL_AID_AWARD = temp[:position]
    
    temp = net_price_items[2].text
    if check("—", temp):
        AVG_TOTAL_AID_AWARD = temp
    
    temp = net_price_temp.find_element_by_class_name("profile__website__link").get_attribute("href")
    if check("—", temp):
        NET_PRICE_CALCULATE_URL = temp

    # locate sticker price
    sticker_price_grp = driver.find_element_by_id("sticker-price")
    tuition_temp = sticker_price_grp.find_element_by_class_name("profile__bucket--1")

    TUITION_IN_STATE = "N\A"
    temp = tuition_temp.find_element_by_class_name("scalar__value").text
    position = temp.index(" / ")
    if check("—", temp[:position]):
        TUITION_IN_STATE = temp[:position]

    tuition_temp = sticker_price_grp.find_element_by_class_name("profile__bucket--2")

    TUITION_OUT_STATE = "N\A"
    temp = tuition_temp.find_element_by_class_name("scalar__value").text
    position = temp.index(" / ")
    if check("—", temp[:position]):
        TUITION_OUT_STATE = temp[:position]
    
    # other tuition cost 1
    other_cost_grp1 = sticker_price_grp.find_element_by_class_name("profile__bucket--3")
    other_cost_temp = other_cost_grp1.find_elements_by_class_name("scalar__value")

    AVG_HOUSING_COST, AVE_MEAL_PLAN_COST, BOOKS_SUPPLIES = "N\A", "N\A", "N\A"
    position = other_cost_temp[0].text.index(" / ")
    if check("—", other_cost_temp[0].text[:position]):
        AVG_HOUSING_COST = other_cost_temp[0].text[:position]

    position = other_cost_temp[1].text.index(" / ")
    if check("—", other_cost_temp[1].text[:position]):
        AVE_MEAL_PLAN_COST = other_cost_temp[1].text[:position]

    position = other_cost_temp[2].text.index(" / ")
    if check("—", other_cost_temp[2].text[:position]):
        BOOKS_SUPPLIES = other_cost_temp[2].text[:position]

    # locate tuition plan data
    TUITION_GUARANTEE_PLAN, TUITION_PAYMENT_PLAN, TUITION_PREPAID_PLAN = "N\A", "N\A", "N\A"
    tuition_plan_grp = sticker_price_grp.find_element_by_class_name("profile__bucket--4")
    tuition_plan_items = tuition_plan_grp.find_elements_by_class_name("scalar__value")
    
    if check("—", tuition_plan_items[0].text):
        TUITION_GUARANTEE_PLAN = tuition_plan_items[0].text

    if check("—", tuition_plan_items[1].text):
        TUITION_PAYMENT_PLAN = tuition_plan_items[1].text

    if check("—", tuition_plan_items[2].text):
        TUITION_PREPAID_PLAN = tuition_plan_items[2].text
    
    cost = {
        "net_cost": str(NET_COST),
        "financial_aid_url": str(financial_aid_url),
        "loan": {
            "avg_amount": str(LOAN_AVG_AMOUNT),
            "take_out": str(LOAN_TAKE_OUT),
            "default_rate": str(LOAN_DEFAULT_RATE)
        },
        "net_price": {
            "net_price": str(NET_PRICE),
            "avg_tot_aid_award": str(AVG_TOTAL_AID_AWARD),
            "stud_receive_aid": str(STUDENT_RECEIVE_AID),
            "calculator_url": str(NET_PRICE_CALCULATE_URL)
        },
        "tuition": {
            "in_state": str(TUITION_IN_STATE),
            "out_state": str(TUITION_OUT_STATE),
            "avg_housing": str(AVG_HOUSING_COST),
            "avg_meal_plan": str(AVE_MEAL_PLAN_COST),
            "book": str(BOOKS_SUPPLIES),
            "plan": {
                "guarantee": str(TUITION_GUARANTEE_PLAN),
                "payment": str(TUITION_PAYMENT_PLAN),
                "prepaid": str(TUITION_PREPAID_PLAN)
            }
        }
    }

    return cost


def retrieve_academic_data(driver, section):
    
    # get the academic detail page url
    academic_detail_page_url = section.find_element_by_class_name("expansion-link__text").get_attribute("href")

    # navigate to the academic detail page
    driver.get(academic_detail_page_url)

    # academic statistic group
    academic_statisic_grp = driver.find_element_by_id("academic-statistics")

    # locate graduation rate
    GRADUATION_RATE = "N\A"
    graduation_rate_temp = academic_statisic_grp.find_element_by_class_name("profile__bucket--2")
    temp = graduation_rate_temp.find_element_by_class_name("scalar__value").text
    position = temp.index("National")

    if check("—", temp[:position]):
        GRADUATION_RATE = temp[:position]
    
    # class statistics
    class_grp = driver.find_element_by_id("about-the-classes")

    # get class size
    class_size_grp = class_grp.find_element_by_class_name("profile__bucket--1")

    CLASS_SIZE_RATIO = {}
    # get the tbl index key
    class_size_key = class_size_grp.find_elements_by_class_name("fact__table__row__label")
    # get the tbl val
    class_size_val = class_size_grp.find_elements_by_class_name("fact__table__row__value")

    # zip them and then form a list so that we can append into the dict
    temp = list(zip(class_size_key, class_size_val))
    for key, val in temp:
        CLASS_SIZE_RATIO[key.text] = val.text
    
    # locate popular major listing
    popular_major_grp = class_grp.find_element_by_class_name("profile__bucket--2")

    # need to click a button in order to view more data from the tbl
    popular_major_grp.find_element_by_class_name("toggle__content__link--profiles").click()

    # locate the major tbl with key val pair
    POPULAR_MAJOR = {}
    # major name
    popular_major_key = popular_major_grp.find_elements_by_class_name("popular-entity__name")
    # major statistics
    popular_major_val = popular_major_grp.find_elements_by_class_name("popular-entity-descriptor")

    temp = list(zip(popular_major_key, popular_major_val))
    for key, val in temp:
        POPULAR_MAJOR[key.text] = val.text

    # get professor statistics
    prof_grp = driver.find_element_by_id("about-the-professors")

    FACULTY_RATIO, FEMALE_PROF, MALE_PROF = "N\A", "N\A", "N\A"
    # narrow down the ele
    prof_info_grp = prof_grp.find_element_by_class_name("profile__bucket--1")
    prof_info = prof_info_grp.find_elements_by_class_name("scalar__value")
    
    if check("—", prof_info[0].text):
        FACULTY_RATIO = prof_info[0].text
    if check("—", prof_info[1].text):
        FEMALE_PROF = prof_info[1].text
    if check("—", prof_info[2].text):
        MALE_PROF = prof_info[2].text

    # get faculty diversity
    FACULTY_DIVERSITY = {}
    prof_diversity_grp = prof_grp.find_element_by_class_name("profile__bucket--2")
    prof_diversity_key = prof_diversity_grp.find_elements_by_class_name("fact__table__row__label")
    prof_diversity_val = prof_diversity_grp.find_elements_by_class_name("fact__table__row__value")

    temp = list(zip(prof_diversity_key, prof_diversity_val))
    for key, val in temp:
        FACULTY_DIVERSITY[key.text] = val.text
    
    academic = {
        "graduation_rate": str(GRADUATION_RATE),
        "class_size_ratio": str(CLASS_SIZE_RATIO),
        "popular_major": POPULAR_MAJOR,
        "faculty": {
            "ratio": str(FACULTY_RATIO),
            "female": str(FEMALE_PROF),
            "male": str(MALE_PROF),
            "diversity": FACULTY_DIVERSITY
        },
        
    }

    return academic


def retrieve_students_data(section):
    return False


if __name__ == "__main__":

    ROOT_URL = "https://www.niche.com/colleges/search/best-colleges/?page="
    collegeURL = []

    global driver
    driver = uc.Chrome()

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
            # section4 = driver.find_element_by_id("admissions")
            # print(retrieve_admission_statistics(driver, section4))

            # back to scholasrhip detail (previous) page
            # driver.get(temp)

            # ====== Uni Cost ========
            # section5 = driver.find_element_by_id("cost")
            # print(retrieve_cost_data(driver, section5))
            
            # back to scholasrhip detail (previous) page
            # driver.get(temp)
            
            # ======== Academic info =========
            # section6 = driver.find_element_by_id("academics")
            # print(retrieve_academic_data(driver, section6))

            # back to scholasrhip detail (previous) page
            # driver.get(temp)

            #  ======== Major data ========
            section7 = driver.find_element_by_id("students")
            retrieve_students_data(section7)


# https://www.niche.com/graduate-schools/massachusetts-institute-of-technology/
# https://www.niche.com/colleges/massachusetts-institute-of-technology/
