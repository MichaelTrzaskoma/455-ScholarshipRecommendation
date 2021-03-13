from selenium import webdriver
# from selenium.webdriver.firefox.options import Options
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException
from fake_useragent import UserAgent

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


if __name__ == "__main__":

    ROOT_URL = "https://www.niche.com/colleges/search/best-colleges/?page="
    collegeURL = []

    ua = UserAgent()
    userAgent = ua.random
    print(userAgent)

    userProfile = "/home/hui/.config/google-chrome/Default"

    # config chrome driver options to speed up the scraping
    co = webdriver.ChromeOptions()
    # co.headless = True
    co.add_argument("start-maximized")
    co.add_argument(f'user-agent={userAgent}')
    co.add_experimental_option('excludeSwitches', ['enable-automation'])
    co.add_argument('--incognito')
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

    capabilities = {
        'useAutomationExtension': False
    }

    global driver
    DRIVER_PATH = "./chromedriver_v88_2"
    driver = webdriver.Chrome(executable_path=DRIVER_PATH, options=co)

    driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
        "source": """
        Object.defineProperty(navigator, 'webdriver', {
          get: () => undefined
        })
      """
    })

    driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")

    # driver = webdriver.Firefox(firefox_profile=fp, options=fo)

    # for the site's pagination
    for i in range(113):

        parsedURL = ROOT_URL + str(i)
        current_page = driver.get(parsedURL)

        # get a list of college item
        collegeItem = driver.find_elements_by_class_name("search-results__list__item")
        time.sleep(random.randint(1, 6))

        # userAgent = ua.random
        # co.add_argument(f'user-agent={userAgent}')

        # get the niche college URL
        for item in collegeItem:
            temp = item.find_element_by_class_name("search-result__link").get_attribute("href")

            # userAgent = ua.random
            # co.add_argument(f'user-agent={userAgent}')

            if temp not in collegeURL:
                collegeURL.append(temp)
                write_collegeData(temp)

                # check if the uni has graduate academic course
                temp_url = form_graduateURL(temp)
                r = requests.get(temp_url)

                if r.status_code == 200:
                    write_collegeData(temp_url)


# https://www.niche.com/graduate-schools/massachusetts-institute-of-technology/
# https://www.niche.com/colleges/massachusetts-institute-of-technology/