from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException

import time
import random
import logging
from tqdm import tqdm

from scrap_log import writeLog_exception_noEle, writeLog_scrapped_data


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


if __name__ == "__main__":

    collegeURL = []

    # config chrome driver options to speed up the scraping
    co = webdriver.ChromeOptions()
    # co.headless = True
    # co.add_argument('--disable-extensions')
    # co.add_argument('--disable-infobars')
    # co.add_argument('--disable-javascripts')

    co.add_argument("start-maximized")
    co.add_argument("--disable-extensions")

    global driver
    DRIVER_PATH = "./chromedriver_v88"
    driver = webdriver.Chrome(executable_path=DRIVER_PATH, options=co)

    # for the site's pagination
    for i in range(112):

        parsedURL = ROOT_URL + str(i)
        current_page = driver.get(parsedURL)

        # get a list of college listing from current page
        # collegeList = driver.find_element_by_class_name("search-results__list")

        # get a list of college item
        collegeItem = driver.find_elements_by_class_name("search-results__list__item")

        # get the niche college URL
        for item in collegeItem:
            temp = item.find_element_by_class_name("search-result__link").get_attribute("href")

            if temp not in collegeURL:
                collegeURL.append(temp)

                print(temp, "\n")
