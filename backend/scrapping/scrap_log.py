
def writeLog_exception_noEle(item):
    # testing func: write the scraping data to a txt
    # INPUT: scraping array
    with open("scholarship_log.txt", "a+", encoding="utf-8") as writer:
        writer.write(str(item) + "\n")
        writer.write("==================================================================================================\n\n")
        writer.close()