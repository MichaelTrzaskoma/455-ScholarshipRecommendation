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
import json
from tqdm import tqdm

from scrap_log import writeLog_exception_noEle, write_collegeData, append_college, college_scraped


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

        def elements_by_id(driver, ele):
            driver.find_elements_by_id(ele)

        DEFAULT_MODE = {
            # multiple elements
            0: elements_by_name,
            1: elements_by_xpath,
            2: elements_by_link_text,
            3: elements_by_partial_link_text,
            4: elements_by_tag_name,
            5: elements_by_class_name,
            6: elements_by_css_selector,
            15: elements_by_id,
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

    except:
        logging.info("An exception occurred!")
        # capture the exception in a txt file
        writeLog_exception_noEle(
            f"No such <{ele}> element in the page.")
        return False

    return True


def close_modal_message(driver):
    # close the model message on the page
    if exception_handler(driver, 13,"ab-modal-interactions") or exception_handler(driver, 13, "ab-close-button"):
        driver.find_element_by_class_name("ab-close-button").click()


def check(key, target):
    # admission scraping page helper
    # check if key exists in the target
    # INPUT: key (str), target (str)
    # OUTPUT: return true if key not exists in the target, else false
    target = str(target)
    key = str(key)
    return True if target.find(key) else False


def form_graduateURL(college_url):
    # parse the college url in order to generate graduate url
    # INPUT: college url
    # OUTPUT: return graduate url

    fields = college_url.split("/")
    return "https://" + fields[2] + "/graduate-schools/" + fields[4] + "/"


def retrieve_niche_grade(driver, section):
    # retrieve niche grade section
    # INPUT: niche grade section block
    # OUTPUT
    # :NICHE_GRADES (key-val pair)

    # expand the grading section in order to retrieve more data
    if exception_handler(section, 13, "report-card__toggle"):
        section.find_element_by_class_name("report-card__toggle").click()

    NICHE_GRADES = {}

    if exception_handler(section, 5, "ordered__list__bucket__item"):
        bucket_list = section.find_elements_by_class_name("ordered__list__bucket__item")

        for temp in bucket_list:
            temp_list_key = temp.find_element_by_class_name("profile-grade__label").text

            # remove the word "grade", empty tab space, next line, and " minus" from the grading
            temp_list_ranking = temp.find_element_by_class_name("niche__grade").text[6:]
            temp_list_ranking = temp_list_ranking.replace("\n", "")
            temp_list_ranking = temp_list_ranking.replace(" minus", "-")
            temp_list_ranking = temp_list_ranking.replace(" ", "_")

            NICHE_GRADES[temp_list_key] = temp_list_ranking
    else:
        NICHE_GRADES = {"N\A": "N\A"}

    return NICHE_GRADES


def retrieve_college_general_info(driver, section):
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
    COLLEGE_DESCRIPTION = "N\A"
    if exception_handler(driver, 13, "bare-value"):
        COLLEGE_DESCRIPTION = driver.find_element_by_class_name("bare-value").text
    elif exception_handler(driver, 13, "premium-paragraph__text"):
        COLLEGE_DESCRIPTION = driver.find_element_by_class_name("premium-paragraph__text").text

    COLLEGE_SITE, COLLEGE_ADDRESS = "N\A", "N\A"
    if exception_handler(section, 13, "profile__website__link"):
        COLLEGE_SITE = section.find_element_by_class_name("profile__website__link").text
    
    if exception_handler(section, 13, "profile__address--compact"):
        COLLEGE_ADDRESS = section.find_element_by_class_name("profile__address--compact").text

    # get college tag(s)
    COLLEGE_TAGS, COLLEGE_LOCATION_TAGS = [], []

    if exception_handler(section, 5, "search-tags__wrap__list__tag__a"):
        tags = section.find_elements_by_class_name("search-tags__wrap__list__tag__a")

        for tag in tags:
            COLLEGE_TAGS.append(tag.text)
    else:
        COLLEGE_TAGS = ["N\A"]

    # get athletic info
    ATHLETICS_DIVISION, ATHLETICS_CONFERENCE = "N\A", "N\A"

    if exception_handler(section, 5, "scalar--two"):
        athletics = section.find_elements_by_class_name("scalar--two")

        if "—" not in athletics[0].text[17:]:
            ATHLETICS_DIVISION = athletics[0].text[17:]

        if "—" not in athletics[1].text[19:]:
            ATHLETICS_CONFERENCE = athletics[1].text[19:]

    # get college location tag(s)
    if exception_handler(section, 5, "profile-breadcrumbs__item"):
        temp_location_tags = section.find_elements_by_class_name("profile-breadcrumbs__item")
        for location in temp_location_tags:
            COLLEGE_LOCATION_TAGS.append(location.text)
    else:
        COLLEGE_LOCATION_TAGS = ["N\A"]
    
    
    return str(COLLEGE_DESCRIPTION), str(COLLEGE_SITE), str(COLLEGE_ADDRESS), COLLEGE_TAGS, str(ATHLETICS_DIVISION), str(ATHLETICS_CONFERENCE), COLLEGE_LOCATION_TAGS


def retrieve_college_ranking(driver, section):
    # get college ranking

    ranking_detail_url = section.find_element_by_class_name("expansion-link__text").get_attribute('href')
    close_modal_message(driver)

    # ######## navigate to ranking detail page ########
    driver.get(ranking_detail_url)

    close_modal_message(driver)

    RANKING = {}
    if exception_handler(driver, 5, "rankings-expansion__badge"):
        rank_listing = driver.find_elements_by_class_name("rankings-expansion__badge")
        for item in rank_listing:
            
            if not exception_handler(item, 13, "rankings-card__link__title"):
                break

            # get the grid item title and ranking and ranking out of total #
            item_title = item.find_element_by_class_name("rankings-card__link__title").text
            item_rank = item.find_element_by_class_name("rankings-card__link__rank__number").text
            item_rank_outOF = item.find_element_by_class_name("rankings-card__link__rank").text

            # trim the unncessary info
            position = item_rank_outOF.index("of")
            item_rank_outOF = item_rank_outOF[(position + 3):]
            
            key = str(item_title).replace(" ", "_")
            key = str(key).replace(".", "")
            RANKING[key] = str(item_rank + "/" + item_rank_outOF)
    else:
        RANKING["N\A"] = "N\A"

    return RANKING


def retrieve_admission_statistics(driver, section):
    # scraping the college admission detail
    # INPUT
    # :driver (selenium webdriver obj)
    # :section (selenium ele obj) - admission section of block from parent page
    # OUPUT: return an admission dict

    admission_detail_url = section.find_element_by_class_name("expansion-link__text").get_attribute('href')

    # ####### navigate to admission detail page ########
    driver.get(admission_detail_url)

    close_modal_message(driver)

    ADMISSION_DESCRIPTION, ACCEPTANCE_RATE, ACCEPTANCE_RATE_EARLY, TOTAL_APPLICANTS = "N\A", "N\A", "N\A", "N\A"
    SAT_ACCEPTANCE_SCORE_RANGE, SAT_READING_SCORE, SAT_MATH_SCORE, SAT_SUBMIT_BY_STUDENT = "N\A", "N\A", "N\A", "N\A"
    ACT_RANGE, ACT_ENG_SCORE, ACT_MATH_SCORE, ACT_WRITE_SCORE, ACT_SUBMIT_BY_STUDENT = "N\A", "N\A", "N\A", "N\A", "N\A"
    ADMISSION_DEADLINE_DATE, DEADLINE_EARLY_DECISION, DEADLINE_EARLY_ACTION, EARLY_OFFERE_DATE, EARLY_OFFER_ACTION = "N\A", "N\A", "N\A", "N\A", "N\A"
    APPLIC_FEE, APPLIC_WEBSITE, APPLIC_COMM_APP, APPLI_ACCEPT_COALITION_APP = "N\A", "N\A", "N\A", "N\A"

    if exception_handler(driver, 13, "bare-value"):
        ADMISSION_DESCRIPTION = driver.find_element_by_class_name("bare-value").text

    # admissing statistics group
    if exception_handler(driver, 7, "admissions-statistics"):
        admissions_statistics_grp = driver.find_element_by_id("admissions-statistics")

        if exception_handler(admissions_statistics_grp, 13, "profile__bucket--1"):
            acceptance_rate_grp1 = admissions_statistics_grp.find_element_by_class_name("profile__bucket--1")

            # get acceptance rate
            if exception_handler(acceptance_rate_grp1, 13, "scalar__value"):
                ACCEPTANCE_RATE = str(acceptance_rate_grp1.find_element_by_class_name("scalar__value").text).replace("\n", "")

            # get early acceptance rate and total applicants
            if exception_handler(admissions_statistics_grp, 13, "profile__bucket--2"):
                acceptance_rate_grp2 = admissions_statistics_grp.find_element_by_class_name("profile__bucket--2")

                if exception_handler(acceptance_rate_grp2, 5, "scalar--three"):
                    acceptance_rate_temp = acceptance_rate_grp2.find_elements_by_class_name("scalar--three")

                    # trimmer - replace no data available with "N\A"
                    if "—" not in acceptance_rate_temp[0].text[30:]:
                        i = str(acceptance_rate_temp[0].text[30:]).replace("\n", "")
                        ACCEPTANCE_RATE_EARLY = i
                    if "—" not in acceptance_rate_temp[1].text[17:]:
                        TOTAL_APPLICANTS = acceptance_rate_temp[1].text[17:]

            # get SAT statistics3
            if exception_handler(admissions_statistics_grp, 13, "profile__bucket--2"):
                sat_grp = admissions_statistics_grp.find_element_by_class_name("profile__bucket--3")

                if exception_handler(sat_grp, 13, "scalar"):
                    sat_temp1 = sat_grp.find_element_by_class_name("scalar")
                     # locate the sat overall range score element
                    temp = sat_temp1.find_element_by_class_name("scalar__value").text

                    if "—" not in temp:
                        i = str(temp).replace("\n", "")
                        SAT_ACCEPTANCE_SCORE_RANGE = i

                if exception_handler(sat_grp, 5, "scalar--three"):
                    sat_temp2 = sat_grp.find_elements_by_class_name("scalar--three")
            
                    # pre-processing those do not have the SAT scores appliable
                    if "—" not in sat_temp2[0].text[11:]:
                        i = str(sat_temp2[0].text[11:]).replace("\n", "")
                        SAT_READING_SCORE = i

                    if "—" not in sat_temp2[1].text[11:]:
                        i = str(sat_temp2[1].text[11:]).replace("\n", "")
                        SAT_MATH_SCORE = i

                    if "—" not in sat_temp2[2].text[11:]:
                        i = str(sat_temp2[2].text[11:]).replace("\n", "")
                        SAT_SUBMIT_BY_STUDENT = i

            # get ACT statistics
            if exception_handler(admissions_statistics_grp, 13, "profile__bucket--4"):
                act_grp = admissions_statistics_grp.find_element_by_class_name("profile__bucket--4")

                if exception_handler(act_grp, 13, "scalar"):
                    act_temp1 = act_grp.find_element_by_class_name("scalar")

                    if exception_handler(act_grp, 5, "scalar--three"):
                        act_temp2 = act_grp.find_elements_by_class_name("scalar--three")

                        # locate the act overall range score element
                        if exception_handler(act_temp1, 13, "scalar__value"):
                            temp = act_temp1.find_element_by_class_name("scalar__value").text

                            # pre-processing those do not have the ACT scores appliable
                            if "—" not in temp:
                                i = str(temp).replace("\n", "")
                                ACT_RANGE = i

                            if "—" not in act_temp2[0].text[11:]:
                                i = str(act_temp2[0].text[11:]).replace("\n", "")
                                ACT_ENG_SCORE = i

                            if "—" not in act_temp2[1].text[8:]:
                                i = str(act_temp2[1].text[8:]).replace("\n", "")
                                ACT_MATH_SCORE = i

                            if "—" not in act_temp2[2].text[11:]:
                                i = str(act_temp2[2].text[11:]).replace("\n", "")
                                ACT_WRITE_SCORE = i

                            if "—" not in act_temp2[3].text[23:]:
                                i = str(act_temp2[3].text[23:]).replace("\n", "")
                                ACT_SUBMIT_BY_STUDENT = i


    # admission deadline group
    if exception_handler(driver, 7, "admissions-deadlines"):
        admission_deadline_grp = driver.find_element_by_id("admissions-deadlines")

        # deadline group
        if exception_handler(admission_deadline_grp, 13, "profile__bucket--1"):
            deadline_grp = admission_deadline_grp.find_element_by_class_name("profile__bucket--1")

            # locate deadline detail
            if exception_handler(deadline_grp, 13, "scalar"):
                deadline_temp1 = deadline_grp.find_element_by_class_name("scalar")

                if exception_handler(deadline_grp, 5, "scalar--three"):
                    deadline_temp2 = deadline_grp.find_elements_by_class_name("scalar--three")

                    # locate the deadline exactly date
                    if exception_handler(deadline_temp1, 13, "scalar__value"):
                        temp = deadline_temp1.find_element_by_class_name("scalar__value").text

                        # pre-processing those do not have the ACT scores appliable
                        if "—" not in temp:
                            i = str(temp).replace("\n", "")
                            ADMISSION_DEADLINE_DATE = i

                        if "—" not in deadline_temp2[0].text[23:]:
                            i = str(deadline_temp2[0].text[23:]).replace("\n", "")
                            DEADLINE_EARLY_DECISION = i

                        if "—" not in deadline_temp2[1].text[21:]:
                            i = str(deadline_temp2[1].text[21:]).replace("\n", "")
                            DEADLINE_EARLY_ACTION = i

                        if "—" not in deadline_temp2[2].text[21:]:
                            i = str(deadline_temp2[2].text[21:]).replace("\n", "")
                            EARLY_OFFERE_DATE = i

                        if "—" not in deadline_temp2[3].text[19:]:
                            i = str(deadline_temp2[3].text[19:]).replace("\n", "")
                            EARLY_OFFER_ACTION = i
    
        # locate the application details
        if exception_handler(admission_deadline_grp, 13, "profile__bucket--2"):
            admission_application_grp = admission_deadline_grp.find_element_by_class_name("profile__bucket--2")

            if exception_handler(admission_deadline_grp, 13, "scalar"):
                applic_temp1 = admission_deadline_grp.find_element_by_class_name("scalar")

                if exception_handler(applic_temp1, 13, "scalar__value"):
                    temp = applic_temp1.find_element_by_class_name("scalar__value").text

                    if "—" not in temp:
                        i = str(temp).replace("\n", "")
                        APPLIC_FEE = i

            if exception_handler(admission_application_grp, 13, "profile__website__link"):
                appli_temp2 = admission_application_grp.find_element_by_class_name("profile__website__link").get_attribute("href")
                if "—" not in appli_temp2:
                    i = str(appli_temp2).replace("\n", "")
                    APPLIC_WEBSITE = i
                
                if exception_handler(admission_application_grp, 5, "scalar--three"):
                    appli_temp3 = admission_application_grp.find_elements_by_class_name("scalar--three")
                    
                    if "—" not in appli_temp3[0].text:
                        i = str(appli_temp3[0].text[18:]).replace("\n", "")
                        APPLIC_COMM_APP = i
                    
                    if "—" not in appli_temp3[1].text[21:]:
                        i = str(appli_temp3[1].text[21:]).replace("\n", "")
                        APPLI_ACCEPT_COALITION_APP = i
    
    # admission requirements
    HIGHSCHO_GPA, HIGHSCHO_RANK, HISHSCHO_TRANSCRIPT, COLLEGE_PRE_COURSE, SAT_OR_ACT, RECOMMENDATION = "N\A", "N\A", "N\A", "N\A", "N\A", "N\A"
    POLL_RESULT1, POLL_RESULT2 = "N\A", "N\A"

    if exception_handler(driver, 7, "admissions-requirements"):
        admission_requirement_grp = driver.find_element_by_id("admissions-requirements")

        if exception_handler(driver, 5, "fact__table__row__value"):
            requirement_temp = admission_requirement_grp.find_elements_by_class_name("fact__table__row__value")

            if "—" not in requirement_temp[0].text:
                HIGHSCHO_GPA = requirement_temp[0].text

            if "—" not in requirement_temp[1].text:
                HIGHSCHO_RANK = requirement_temp[1].text

            if "—" not in requirement_temp[2].text:
                HISHSCHO_TRANSCRIPT = requirement_temp[2].text

            if "—" not in requirement_temp[3].text:
                COLLEGE_PRE_COURSE = requirement_temp[3].text

            if "—" not in requirement_temp[4].text:
                SAT_OR_ACT = requirement_temp[4].text

            if "—" not in requirement_temp[5].text:
                RECOMMENDATION = requirement_temp[5].text

            # admission poll results
            if exception_handler(admission_requirement_grp, 13, "profile__bucket--2"):
                poll_temp = admission_requirement_grp.find_element_by_class_name("profile__bucket--2")
                
                if exception_handler(poll_temp, 13, "poll__single__percent__label"):
                    temp = poll_temp.find_element_by_class_name("poll__single__percent__label").text
                    if "—" not in temp:
                        POLL_RESULT1 = temp
                    
                    poll_temp = admission_requirement_grp.find_element_by_class_name("profile__bucket--3")
                    temp = poll_temp.find_element_by_class_name("poll__single__percent__label").text
                    if "—" not in temp:
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

    close_modal_message(driver)

    # there are two element named id with "cost", so need to process them
    NET_COST = "N\A"
    student_loan_url, financial_aid_url = "N\A", "N\A"
    LOAN_AVG_AMOUNT, LOAN_TAKE_OUT, LOAN_DEFAULT_RATE = "N\A", "N\A", "N\A"

    if exception_handler(driver, 15, "cost"):
        cost_info_temp = driver.find_elements_by_id("cost")
        cost_grp = cost_info_temp[1]

        if exception_handler(cost_grp, 13, "profile__bucket--3"):
            cost_temp = cost_grp.find_element_by_class_name("profile__bucket--3")
            
            if exception_handler(cost_temp, 13, "scalar__value"):
                temp = cost_temp.find_element_by_class_name("scalar__value").text
                # parse the unnecessary info
                position = temp.index(" / ")
                if "—" not in temp[:position]:
                    NET_COST = temp[:position]
        
        if exception_handler(cost_grp, 13, "profile__bucket--4"):
            # locate financial loan and aid urls
            loan_aid_temp = cost_grp.find_element_by_class_name("profile__bucket--4")

            if exception_handler(loan_aid_temp, 5, "expansion-link__text"):
                loan_aid_urls = loan_aid_temp.find_elements_by_class_name("expansion-link__text")
                student_loan_url = loan_aid_urls[0].get_attribute("href")
                financial_aid_url = loan_aid_urls[1].get_attribute("href")

                # navigate to student loan page
                driver.get(student_loan_url)

                if exception_handler(driver, 7, "about-student-loans"):
                    loan_grp = driver.find_element_by_id("about-student-loans")

                    if exception_handler(loan_grp, 13, "profile__bucket--1"):
                        loan_info_block = loan_grp.find_element_by_class_name("profile__bucket--1")

                        if exception_handler(loan_info_block, 13, "scalar"):
                            temp = loan_info_block.find_element_by_class_name("scalar")

                            if exception_handler(loan_info_block, 13, "scalar"):
                                info = temp.find_element_by_class_name("scalar__value")

                                position = info.text.index(" / ")
                                if "—" not in info.text[:position]:
                                    LOAN_AVG_AMOUNT = info.text[:position]


                        if exception_handler(loan_info_block, 5, "scalar--three"):
                            loan_infos = loan_info_block.find_elements_by_class_name("scalar--three")

                            if "—" not in loan_infos[0].text[25:]:
                                LOAN_TAKE_OUT = loan_infos[0].text[25:]
                            
                            # there are words like "\n11%" in the string
                            temp = loan_infos[1].text[17:3].replace("\n", "")
                            if "—" not in temp:
                                LOAN_DEFAULT_RATE = temp
    
    # navigate back to the cost detail page
    driver.get(cost_detail_url)

    # locate net price breakdown
    NET_PRICE, AVG_TOTAL_AID_AWARD, STUDENT_RECEIVE_AID, NET_PRICE_CALCULATE_URL = "N\A", "N\A", "N\A", "N\A"
    if exception_handler(driver, 7, "net-price"):
        net_price_grp = driver.find_element_by_id("net-price")

        if exception_handler(net_price_grp, 13, "profile__bucket--1"):
            net_price_temp = net_price_grp.find_element_by_class_name("profile__bucket--1")

            if exception_handler(net_price_temp, 5, "scalar__value"):
                net_price_items = net_price_temp.find_elements_by_class_name("scalar__value")

                temp = net_price_items[0].text
                position = temp.index(" / ")
                if "—" not in temp[:position]:
                    NET_PRICE = temp[:position]
                
                temp = net_price_items[1].text
                position = temp.index(" / ")
                if "—" not in temp[:position]:
                    AVG_TOTAL_AID_AWARD = temp[:position]
                
                temp = net_price_items[2].text
                if "—" not in temp:
                    STUDENT_RECEIVE_AID = temp
                
                if exception_handler(net_price_temp, 13, "profile__website__link"):
                    temp = net_price_temp.find_element_by_class_name("profile__website__link").get_attribute("href")
                    if "—" not in temp:
                        NET_PRICE_CALCULATE_URL = temp
    
    TUITION_IN_STATE, TUITION_OUT_STATE = "N\A", "N\A"
    AVG_HOUSING_COST, AVE_MEAL_PLAN_COST, BOOKS_SUPPLIES = "N\A", "N\A", "N\A"
    TUITION_GUARANTEE_PLAN, TUITION_PAYMENT_PLAN, TUITION_PREPAID_PLAN = "N\A", "N\A", "N\A"
    
    # locate sticker price
    if exception_handler(driver, 15, "sticker-price"):
        sticker_price_grp = driver.find_element_by_id("sticker-price")

        if exception_handler(sticker_price_grp, 13, "profile__bucket--1"):
            tuition_temp = sticker_price_grp.find_element_by_class_name("profile__bucket--1")

            if exception_handler(tuition_temp, 13, "scalar__value"):
                temp = tuition_temp.find_element_by_class_name("scalar__value").text
                position = temp.index(" / ")
                if "—" not in temp[:position]:
                    TUITION_IN_STATE = temp[:position]

        if exception_handler(sticker_price_grp, 13, "profile__bucket--2"):
            tuition_temp = sticker_price_grp.find_element_by_class_name("profile__bucket--2")

            if exception_handler(tuition_temp, 13, "scalar__value"):
                temp = tuition_temp.find_element_by_class_name("scalar__value").text
                position = temp.index(" / ")
                if "—" not in temp[:position]:
                    TUITION_OUT_STATE = temp[:position]
        
        # other tuition cost 1
        if exception_handler(sticker_price_grp, 13, "profile__bucket--3"):
            other_cost_grp1 = sticker_price_grp.find_element_by_class_name("profile__bucket--3")

            if exception_handler(other_cost_grp1, 5, "scalar--three"):
                other_cost_temp = other_cost_grp1.find_elements_by_class_name("scalar--three")
                
                if "—" not in other_cost_temp[0].text:
                    position = other_cost_temp[0].text.index(" / ")
                    AVG_HOUSING_COST = other_cost_temp[0].text[:position]

                if "—" not in other_cost_temp[1].text:
                    position = other_cost_temp[1].text.index(" / ")
                    AVE_MEAL_PLAN_COST = other_cost_temp[1].text[:position]

                if "—" not in other_cost_temp[2].text:
                    position = other_cost_temp[2].text.index(" / ")
                    BOOKS_SUPPLIES = other_cost_temp[2].text[:position]

        # locate tuition plan data
        if exception_handler(sticker_price_grp, 13, "profile__bucket--4"):
            tuition_plan_grp = sticker_price_grp.find_element_by_class_name("profile__bucket--4")

            if exception_handler(other_cost_grp1, 5, "scalar__value"):
                tuition_plan_items = tuition_plan_grp.find_elements_by_class_name("scalar__value")
                
                if "—" not in tuition_plan_items[0].text:
                    TUITION_GUARANTEE_PLAN = tuition_plan_items[0].text

                if "—" not in tuition_plan_items[1].text:
                    TUITION_PAYMENT_PLAN = tuition_plan_items[1].text

                if "—" not in tuition_plan_items[2].text:
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

    close_modal_message(driver)

    # academic statistic group
    GRADUATION_RATE = "N\A"
    if exception_handler(driver, 7, "academic-statistics"):
        academic_statisic_grp = driver.find_element_by_id("academic-statistics")

        # locate graduation rate
        graduation_rate_temp = academic_statisic_grp.find_element_by_class_name("profile__bucket--2")
        temp = graduation_rate_temp.find_element_by_class_name("scalar__value").text
        position = temp.index("National")

        if "—" not in temp[:position]:
            # remove the extra line if any
            i = str(temp[:position]).replace("\n", "")
            GRADUATION_RATE = i
    
    # class statistics
    POPULAR_MAJOR, CLASS_SIZE_RATIO = {}, {}
    if exception_handler(driver, 7, "about-the-classes"):
        class_grp = driver.find_element_by_id("about-the-classes")

        # get class size
        if exception_handler(class_grp, 13, "profile__bucket--1"):
            class_size_grp = class_grp.find_element_by_class_name("profile__bucket--1")

            # get the tbl index key
            if exception_handler(class_size_grp, 5, "fact__table__row__label"):
                class_size_key = class_size_grp.find_elements_by_class_name("fact__table__row__label")
                # get the tbl val
                class_size_val = class_size_grp.find_elements_by_class_name("fact__table__row__value")

                # zip them and then form a list so that we can append into the dict
                temp = list(zip(class_size_key, class_size_val))
                for key, val in temp:
                    # need to remove "." in the key, otherwise mongodb wouldn't accept it
                    i = str(key.text).replace(".", "")
                    i = str(i).replace(" ", "_")
                    CLASS_SIZE_RATIO[i] = val.text
            else:
                CLASS_SIZE_RATIO["N\A"] = "N\A"
            
        # locate popular major listing
        if exception_handler(class_grp, 13, "profile__bucket--2"):
            popular_major_grp = class_grp.find_element_by_class_name("profile__bucket--2")

            # need to click a button in order to view more data from the tbl
            if exception_handler(popular_major_grp, 13, "toggle__content__link--profiles"):
                popular_major_grp.find_element_by_class_name("toggle__content__link--profiles").click()
            
            # major name
            if exception_handler(popular_major_grp, 5, "popular-entity__name"):
                popular_major_key = popular_major_grp.find_elements_by_class_name("popular-entity__name")
                # major statistics
                popular_major_val = popular_major_grp.find_elements_by_class_name("popular-entity-descriptor")

                temp = list(zip(popular_major_key, popular_major_val))
                for key, val in temp:
                    # need to remove "." in the key, otherwise mongodb wouldn't accept it
                    i = str(key.text).replace(".", "")
                    i = str(i).replace(" ", "_")
                    POPULAR_MAJOR[i] = val.text
            else:
                POPULAR_MAJOR["N\A"] = "N\A"
    
    FACULTY_RATIO, FEMALE_PROF, MALE_PROF = "N\A", "N\A", "N\A"
    FACULTY_DIVERSITY = {}

    # get professor statistics
    if exception_handler(driver, 7, "about-the-professors"):
        prof_grp = driver.find_element_by_id("about-the-professors")
    
        # narrow down the ele
        if exception_handler(prof_grp, 13, "profile__bucket--1"):
            prof_info_grp = prof_grp.find_element_by_class_name("profile__bucket--1")

            if exception_handler(prof_info_grp, 5, "scalar__value"):
                prof_info = prof_info_grp.find_elements_by_class_name("scalar__value")
                
                if "—" not in prof_info[0].text:
                    FACULTY_RATIO = prof_info[0].text
                if "—" not in prof_info[1].text:
                    FEMALE_PROF = prof_info[1].text
                if "—" not in prof_info[2].text:
                    MALE_PROF = prof_info[2].text

    # get faculty diversity
    if exception_handler(prof_grp, 13, "profile__bucket--2"):
        prof_diversity_grp = prof_grp.find_element_by_class_name("profile__bucket--2")

        if exception_handler(prof_diversity_grp, 5, "fact__table__row__label"):
            prof_diversity_key = prof_diversity_grp.find_elements_by_class_name("fact__table__row__label")
            prof_diversity_val = prof_diversity_grp.find_elements_by_class_name("fact__table__row__value")

            temp = list(zip(prof_diversity_key, prof_diversity_val))
            for key, val in temp:
                # need to remove "." in the key, otherwise mongodb wouldn't accept it
                i = str(key.text).replace(".", "")
                i = str(i).replace(" ", "_")
                FACULTY_DIVERSITY[i] = val.text
        else:
            FACULTY_DIVERSITY["N\A"] = "N\A"
    
    academic = {
        "graduation_rate": str(GRADUATION_RATE),
        "class_size_ratio": CLASS_SIZE_RATIO,
        "popular_major": POPULAR_MAJOR,
        "faculty": {
            "ratio": str(FACULTY_RATIO),
            "female": str(FEMALE_PROF),
            "male": str(MALE_PROF),
            "diversity": FACULTY_DIVERSITY
        }
    }

    return academic


def retrieve_students_data(driver, section):
    stud_detail_url = section.find_element_by_class_name("expansion-link__text").get_attribute("href")

    # navigate to student detail page url
    driver.get(stud_detail_url)

    close_modal_message(driver)

    # get about student group
    FEMALE_UNDERGRADS, MALE_UNDERGRADS = "N\A", "N\A"
    STUD_AGE, STUD_RESIDENCE, RACIAL_DIVERSITY = {}, {}, {}

    if exception_handler(driver, 7, "about-the-students"):
        about_stud_grp = driver.find_element_by_id("about-the-students")
        
        # get undergraudate gender ratio
        
        if exception_handler(about_stud_grp, 13, "profile__bucket--2"):
            temp_grp = about_stud_grp.find_element_by_class_name("profile__bucket--2")

            if exception_handler(temp_grp, 5, "scalar__value"):
                ratio_grp = temp_grp.find_elements_by_class_name("scalar__value")

                if "—" not in ratio_grp[0].text:
                    FEMALE_UNDERGRADS = ratio_grp[0].text
                if "—" not in ratio_grp[1].text:
                    MALE_UNDERGRADS = ratio_grp[1].text
                
                # get student residence info

                if exception_handler(temp_grp, 5, "fact__table__row__label"):
                    residence_key = temp_grp.find_elements_by_class_name("fact__table__row__label")
                    residence_val = temp_grp.find_elements_by_class_name("fact__table__row__value")

                    temp = list(zip(residence_key, residence_val))

                    for key, val in temp:
                        # need to remove "." in the key, otherwise mongodb wouldn't accept it
                        i = str(key.text).replace(".", "")
                        i = str(i).replace(" ", "_")
                        STUD_RESIDENCE[i] = val.text
                else:
                    STUD_RESIDENCE["N\A"] = "N\A"
        
        # get student age info
        if exception_handler(about_stud_grp, 13, "profile__bucket--3"):
            age_grp = about_stud_grp.find_element_by_class_name("profile__bucket--3")

            if exception_handler(age_grp, 5, "fact__table__row__label"):
                age_key = age_grp.find_elements_by_class_name("fact__table__row__label")
                age_val = age_grp.find_elements_by_class_name("fact__table__row__value")

                temp = list(zip(age_key, age_val))
                for key, val in temp:
                    # need to remove "." in the key, otherwise mongodb wouldn't accept it
                    i = str(key.text).replace(".", "")
                    i = str(i).replace(" ", "_")
                    STUD_AGE[i] = val.text
            else:
                STUD_AGE["N\A"] = "N\A"
    
    # locate racial diversity
    if exception_handler(driver, 7, "ethnic-diversity"):
        racial_diversity_grp = driver.find_element_by_id("ethnic-diversity")

        if exception_handler(racial_diversity_grp, 5, "fact__table__row__label"):
            racial_diversity_key = racial_diversity_grp.find_elements_by_class_name("fact__table__row__label")
            racial_diversity_val = racial_diversity_grp.find_elements_by_class_name("fact__table__row__value")

            temp = list(zip(racial_diversity_key, racial_diversity_val))
            for key, val, in temp:
                # need to remove "." in the key, otherwise mongodb wouldn't accept it
                i = str(key.text).replace(".", "")
                i = str(i).replace(" ", "_")
                RACIAL_DIVERSITY[i] = val.text
        else:
            RACIAL_DIVERSITY["N\A"] = "N\A"
    
    student_info = {
        "gender_ratio": {
            "female_undergrads": str(FEMALE_UNDERGRADS),
            "male_undergrads": str(MALE_UNDERGRADS)
        },
        "residence": STUD_RESIDENCE,
        "age": STUD_AGE,
        "racial_diversity": RACIAL_DIVERSITY
    }

    return student_info


def retrieve_campus_life(driver, section):
    campus_life_url = section.find_element_by_class_name("expansion-link__text").get_attribute("href")

    driver.get(campus_life_url)

    close_modal_message(driver)

    # locate the sport section
    VARSITY_SPORT = {}
    VARSITY_SPORT_MALE, VARSITY_SPORT_FEMALE = [], []

    if exception_handler(driver, 7, "sports"):
        sport_grp = driver.find_element_by_id("sports")

        # locate varsity sports
        if exception_handler(sport_grp, 13, "profile__bucket--1"):
            sport_poll = sport_grp.find_element_by_class_name("profile__bucket--1")

            if exception_handler(sport_poll, 5, "poll__table__result__label"):
                poll_key = sport_poll.find_elements_by_class_name("poll__table__result__label")
                poll_val = sport_poll.find_elements_by_class_name("poll__table__result__percent")

                temp = list(zip(poll_key, poll_val))
                for key, val in temp:
                    # need to remove "." in the key, otherwise mongodb wouldn't accept it
                    i = str(key.text).replace(".", "")
                    i = str(i).replace(" ", "_")
                    VARSITY_SPORT[i] = val.text
            else:
                VARSITY_SPORT["N\A"] = "N\A"
    
        # varsity sport based on gender
        if exception_handler(sport_grp, 13, "profile__bucket--2"):
            gender_varsity_sport_grp = sport_grp.find_element_by_class_name("profile__bucket--2")

            if exception_handler(gender_varsity_sport_grp, 5, "scalar--two"):
                varsity_sport_grp = gender_varsity_sport_grp.find_elements_by_class_name("scalar--two")

                if "—" not in varsity_sport_grp[0].text[20:]:
                    VARSITY_SPORT_MALE = varsity_sport_grp[0].text[20:].split(", ")

                if "—" not in varsity_sport_grp[1].text[22:]:
                    VARSITY_SPORT_FEMALE = varsity_sport_grp[1].text[22:].split(", ")
            else:
                VARSITY_SPORT_FEMALE["N\A"] = "N\A"
    
    OFFERED_CLUB, OFFERED_MUSIC = [], []
    CLUB_EVENT_POLL = {}

    # get club activities
    if exception_handler(driver, 7, "clubs-activities"):
        club_activity = driver.find_element_by_id("clubs-activities")

        if exception_handler(club_activity, 13, "profile__bucket--1"):
            club_grp = club_activity.find_element_by_class_name("profile__bucket--1")

            # get available clubs and music
            if exception_handler(club_grp, 5, "scalar--two"):
                club_temp = club_grp.find_elements_by_class_name("scalar--two")

                temp = str(club_temp[0].text[13:])
                if "—" not in temp:
                    OFFERED_CLUB = temp.split(", ")
                
                temp = str(club_temp[1].text[5:])
                if "—" not in temp:
                    OFFERED_MUSIC = temp.split(", ")
            else:
                OFFERED_CLUB.append("N\A")
                OFFERED_MUSIC.append("N\A")
            
        if exception_handler(club_activity, 13, "profile__bucket--2"):
            # get club event poll results
            club_poll_grp = club_activity.find_element_by_class_name("profile__bucket--2")

            # click the btn to view moew poll results
            if exception_handler(club_poll_grp, 13, "toggle__content__link--profiles"):
                club_poll_grp.find_element_by_class_name("toggle__content__link--profiles").click()

            # find the key of the poll
            if exception_handler(club_poll_grp, 5, "poll__table__result__label"):
                club_poll_key = club_poll_grp.find_elements_by_class_name("poll__table__result__label")

                # find the val of the poll
                club_poll_val = club_poll_grp.find_elements_by_class_name("poll__table__result__percent")

                temp = list(zip(club_poll_key, club_poll_val))
                for key, val in temp:
                    # need to remove "." in the key, otherwise mongodb wouldn't accept it
                    i = str(key.text).replace(".", "")
                    i = str(i).replace(" ", "_")
                    CLUB_EVENT_POLL[i] = val.text
            else:
                CLUB_EVENT_POLL["N\A"] = "N\A"
    
    club_sport = {
        "sport": {
            "varsity": VARSITY_SPORT,
            "male": VARSITY_SPORT_MALE,
            "female": VARSITY_SPORT_FEMALE
        },
        "club": {
            "offered": OFFERED_CLUB,
            "music": OFFERED_MUSIC,
            "survey_result": CLUB_EVENT_POLL
        }
    }

    return club_sport


def retrieve_after_college(driver, section):
    # get after college detail page url
    after_uni_url = section.find_element_by_class_name("expansion-link__text").get_attribute("href")

    # navigate to after college detail page
    driver.get(after_uni_url)

    close_modal_message(driver)

    # get graduation rate
    GRADUATION_RATE = "N\A"

    if exception_handler(driver, 7, "overall-value"):
        graduate_grp = driver.find_element_by_id("overall-value")

        if exception_handler(graduate_grp, 13, "profile__bucket--3"):
            temp = graduate_grp.find_element_by_class_name("profile__bucket--3")

            if exception_handler(temp, 13, "scalar__value"):
                rate_temp = temp.find_element_by_class_name("scalar__value").text
                position = rate_temp.index("National")
                
                if "—" not in rate_temp[:position]:
                    i = str(rate_temp[:position]).replace("\n", "")
                    GRADUATION_RATE = i

    # get earning after the uni
    EARNING_AFTER_2YR, EARNING_AFTER_6YR = "N\A", "N\A"

    if exception_handler(driver, 7, "earnings"):
        after_uni_earning_grp = driver.find_element_by_id("earnings")
        
        # 2 years after graduating
        if exception_handler(after_uni_earning_grp, 13, "profile__bucket--1"):
            year_grp = after_uni_earning_grp.find_element_by_class_name("profile__bucket--1")

            if exception_handler(year_grp, 13, "scalar__value"):
                earning_temp = year_grp.find_element_by_class_name("scalar__value").text
                position = earning_temp.index(" / ")

                if "—" not in earning_temp[:position]:
                    EARNING_AFTER_2YR = earning_temp[:position]
        
        if exception_handler(after_uni_earning_grp, 13, "profile__bucket--2"):
            year_grp = after_uni_earning_grp.find_element_by_class_name("profile__bucket--2")

            if exception_handler(year_grp, 13, "scalar__value"):
                earning_temp = year_grp.find_element_by_class_name("scalar__value").text
                position = earning_temp.index(" / ")

                if "—" not in earning_temp[:position]:
                    EARNING_AFTER_6YR = earning_temp[:position]
    
    # get job employement rate after uni
    EMPLOY_AFTER_2YR, EMPLOY_AFTER_6YR, DEBT_AFTER_UNI = "N\A", "N\A", "N\A"

    if exception_handler(driver, 7, "job-placement"):
        employment_grp = driver.find_element_by_id("job-placement")

        if exception_handler(employment_grp, 13, "profile__bucket--1"):
            employment_temp = employment_grp.find_element_by_class_name("profile__bucket--1")

            if exception_handler(employment_temp, 5, "scalar__value"):
                employment_rates = employment_temp.find_elements_by_class_name("scalar__value")

                if "—" not in employment_rates[0].text:
                    EMPLOY_AFTER_2YR = employment_rates[0].text

                if "—" not in employment_rates[1].text:
                    EMPLOY_AFTER_6YR = employment_rates[1].text
        
    # get student debt after college
    if exception_handler(driver, 7, "student-debt"):
        debt_grp = driver.find_element_by_id("student-debt")

        if exception_handler(debt_grp, 13, "profile__bucket--1"):
            debt_temp = debt_grp.find_element_by_class_name("profile__bucket--1")
            
            if exception_handler(debt_temp, 13, "scalar__value"):
                temp = debt_temp.find_element_by_class_name("scalar__value").text
                position = temp.index(" / ")
                
                if "—" not in temp[:position]:
                    DEBT_AFTER_UNI = temp[:position]
    
    after_uni = {
        "graudation_rate": str(GRADUATION_RATE),
        "earning": {
            "2yr": str(EARNING_AFTER_2YR),
            "6yr": str(EARNING_AFTER_6YR)
        },
        "employment": {
            "2yr": str(EMPLOY_AFTER_2YR),
            "6yr": str(EMPLOY_AFTER_6YR)
        },
        "debt_after_uni": str(DEBT_AFTER_UNI)
    }

    return after_uni


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

            file = open("college_scraped_url.txt")
            scraped_list = file.read()
            scraped_list = scraped_list.split("\n")
            file.close()

            if temp not in scraped_list:
                
                college = {}

                college["grad"] = 0
                
                # check if there's grad school in this uni
                graduate_url = form_graduateURL(temp)
                if driver.get(graduate_url):
                    college["grad"] = 1

                driver.get(temp)

                close_modal_message(driver)

                # get college name
                college["name"] = driver.find_element_by_class_name("postcard__title").text

                # ======== overall ranking list by the niche.com ========
                NICHE_GRADES = {"N\A": "N\A"}

                if exception_handler(driver, 7, "report-card"):
                    section1 = driver.find_element_by_id("report-card")
                    NICHE_GRADES = retrieve_niche_grade(driver, section1)

                college["niche_grade"] = NICHE_GRADES

                time.sleep(random.randint(1, 6))

                # ======== college info ========
                COLLEGE_DESCRIPTION, COLLEGE_SITE, COLLEGE_ADDRESS, ATHLETICS_DIVISION, ATHLETICS_CONFERENCE = "N\A", "N\A", "N\A", "N\A", "N\A"
                COLLEGE_TAGS, COLLEGE_LOCATION_TAGS = ["N\A"], ["N\A"]

                if exception_handler(driver, 7, "about"):
                    section2 = driver.find_element_by_id("about")
                    COLLEGE_DESCRIPTION, COLLEGE_SITE, COLLEGE_ADDRESS, COLLEGE_TAGS, ATHLETICS_DIVISION, ATHLETICS_CONFERENCE, COLLEGE_LOCATION_TAGS = retrieve_college_general_info(driver, section2)
                # print(retrieve_college_general_info(section2))

                college["description"] = COLLEGE_DESCRIPTION
                college["site"] = COLLEGE_SITE

                college["address"] = COLLEGE_ADDRESS
                college["location_tags"] = COLLEGE_LOCATION_TAGS

                college["about"] = []
                for item in COLLEGE_TAGS:
                    college["about"].append(str(item))
                
                college["athletics"] = {
                    "division": ATHLETICS_DIVISION,
                    "conference": ATHLETICS_CONFERENCE
                }

                time.sleep(random.randint(1, 6))

                # ======== ranking list ========
                ranking = {"N\A": "N\A"}

                if exception_handler(driver, 7, "rankings"):
                    section3 = driver.find_element_by_id("rankings")
                    ranking = retrieve_college_ranking(driver, section3)
                    # for item in RANKING:
                    #     print(item, end=" ")

                college["ranking"] = ranking

                # back to scholasrhip detail (previous) page
                driver.get(temp)
                
                time.sleep(random.randint(1, 6))
                close_modal_message(driver)

                # ======== Admission info ========
                admission_statistics = {
                    "description": str("N\A"),
                    "acceptance": {
                        "rate": str("N\A"),
                        "rate_early": str("N\A")
                    },
                    "total_applicants": str("N\A"),
                    "sat": {
                        "accept_score_range": str("N\A"),
                        "reading_score": str("N\A"),
                        "math_score": str("N\A"),
                        "submite_by_student": str("N\A")
                    },
                    "act": {
                        "accept_score_range": str("N\A"),
                        "eng_score": str("N\A"),
                        "math_score": str("N\A"),
                        "write_score": str("N\A"),
                        "submite_by_student": str("N\A")
                    },
                    "deadline": {
                        "date": str("N\A"),
                        "early_decision": str("N\A"),
                        "early_action": str("N\A"),
                        "early_offer_date": str("N\A"),
                        "early_action": str("N\A")
                    },
                    "application": {
                        "fee": str("N\A"),
                        "website": str("N\A"),
                        "comm_app": str("N\A"),
                        "accept_coalition_app": str("N\A")
                    },
                    "requirements": {
                        "highscho_gpa": str("N\A"),
                        "highscho_rank": str("N\A"),
                        "highscho_transcript": str("N\A"),
                        "uni_precourse": str("N\A"),
                        "sat_or_act": str("N\A"),
                        "recommendation": str("N\A"),
                        "poll_uni_care_them": str("N\A"),
                        "poll_uni_care_individual": str("N\A")
                    }
                }

                if exception_handler(driver, 7, "admissions"):
                    section4 = driver.find_element_by_id("admissions")
                    admission_statistics = retrieve_admission_statistics(driver, section4)

                college["admission"] = admission_statistics

                # back to scholasrhip detail (previous) page
                driver.get(temp)
                time.sleep(random.randint(1, 6))
                close_modal_message(driver)

                # ====== Uni Cost ========
                cost = {
                    "net_cost": str("N\A"),
                    "financial_aid_url": str("N\A"),
                    "loan": {
                        "avg_amount": str("N\A"),
                        "take_out": str("N\A"),
                        "default_rate": str("N\A")
                    },
                    "net_price": {
                        "net_price": str("N\A"),
                        "avg_tot_aid_award": str("N\A"),
                        "stud_receive_aid": str("N\A"),
                        "calculator_url": str("N\A")
                    },
                    "tuition": {
                        "in_state": str("N\A"),
                        "out_state": str("N\A"),
                        "avg_housing": str("N\A"),
                        "avg_meal_plan": str("N\A"),
                        "book": str("N\A"),
                        "plan": {
                            "guarantee": str("N\A"),
                            "payment": str("N\A"),
                            "prepaid": str("N\A")
                        }
                    }
                }

                if exception_handler(driver, 7, "cost"):
                    section5 = driver.find_element_by_id("cost")
                    cost = retrieve_cost_data(driver, section5)

                college["cost"] = cost
                
                # back to scholasrhip detail (previous) page
                driver.get(temp)
                time.sleep(random.randint(1, 6))
                close_modal_message(driver)
                
                # ======== Academic info =========
                academic = {
                    "graduation_rate": str("N\A"),
                    "class_size_ratio": "N\A",
                    "popular_major": "N\A",
                    "faculty": {
                        "ratio": str("N\A"),
                        "female": str("N\A"),
                        "male": str("N\A"),
                        "diversity": "N\A"
                    }
                }
                if exception_handler(driver, 7, "academics"):
                    section6 = driver.find_element_by_id("academics")
                    academic = retrieve_academic_data(driver, section6)

                college["academic"] = academic

                # back to scholasrhip detail (previous) page
                driver.get(temp)
                time.sleep(random.randint(1, 6))
                close_modal_message(driver)

                #  ======== Major data ========
                major = {
                    "gender_ratio": {
                        "female_undergrads": str("N\A"),
                        "male_undergrads": str("N\A")
                    },
                    "residence": {"N\A": "N\A"},
                    "age": {"N\A": "N\A"},
                    "racial_diversity": {"N\A": "N\A"}
                }

                if exception_handler(driver, 7, "students"):
                    section7 = driver.find_element_by_id("students")
                    major = retrieve_students_data(driver, section7)

                college["major"] = major

                # back to scholasrhip detail (previous) page
                driver.get(temp)
                time.sleep(random.randint(1, 6))
                close_modal_message(driver)

                # ======== Campus life ========
                sport_club = {
                    "sport": {
                        "varsity": {"N\A": "N\A"},
                        "male": ["N\A"],
                        "female": ["N\A"]
                    },
                    "club": {
                        "offered": ["N\A"],
                        "music": ["N\A"],
                        "survey_result": {"N\A": "N\A"}
                    }
                }

                if exception_handler(driver, 7, "campus-life"):
                    section8 = driver.find_element_by_id("campus-life")
                    sport_club = retrieve_campus_life(driver, section8)

                college["campus_life"] = sport_club

                # back to scholasrhip detail (previous) page
                driver.get(temp)
                time.sleep(random.randint(1, 6))
                close_modal_message(driver)

                # ======== After College ========
                after_uni = {
                    "graudation_rate": str("N\A"),
                    "earning": {
                        "2yr": str("N\A"),
                        "6yr": str("N\A")
                    },
                    "employment": {
                        "2y": str("N\A"),
                        "6y": str("N\A")
                    },
                    "debt_after_uni": str("N\A")
                }

                if exception_handler(driver, 7, "after"):
                    section9 = driver.find_element_by_id("after")
                    after_uni = retrieve_after_college(driver, section9)

                time.sleep(random.randint(1, 6))

                college["after_uni"] = after_uni

                # insert the dict to mongodb
                append_college(college)
                college_scraped(temp)
                
                print("Done!")


# https://www.niche.com/graduate-schools/massachusetts-institute-of-technology/
# https://www.niche.com/colleges/massachusetts-institute-of-technology/

