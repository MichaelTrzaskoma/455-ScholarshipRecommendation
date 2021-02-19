
def writeLog_exception_noEle(item):
    # testing func: write the scraping data to a txt
    # INPUT: scraping array
    with open("scholarship_log.txt", "a+", encoding="utf-8") as writer:
        writer.write(str(item) + "\n")
        writer.write("==================================================================================================\n\n")
        writer.close()


def writeLog_scrapped_data(item):
    # testing func: write the scraping data to a txt
    # INPUT: scraping array
    with open("test_output.txt", "a+", encoding="utf-8") as writer:
        for x in item:
            writer.write(str(x) + "\n")

        writer.write("======================================\n\n")
        writer.close()