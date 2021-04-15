# test for the college scraping program - partly


def check(key, target):
    # admission scraping page helper
    # check if key exists in the target
    # INPUT: key (str), target (str)
    # OUTPUT: return true if key not exists in the target, else false
    target = str(target)
    key = str(key)
    return True if target.find(key) else False


string = "No data available  \n—"

if check("No data available", string):
    print("True")
else:
    print("False")

