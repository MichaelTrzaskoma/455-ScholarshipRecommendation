# This is a utilities file for the APIs and recommendation model

def trimmer_keySlash(key):
    # trim the slash from the key
    # INPUT: key (str)
    # OUTPUT: return the key without slash(es)
    if "/" in key:
        return str(key).replace("/", " ")
    else:
        return key


def trimmer_underscore(key):
    # trim underscore from the key
    # INPUT: key (str)
    # OUTPUT: return the key without underscore
    if "_" in key:
        return str(key).replace("_", " ")
    else:
        return key


def trimmer_nextline(key):
    # trim nextline from the key
    # INPUT: key (str)
    # OUTPUT: return the key without nextline
    if "\n" in key:
        return str(key).replace("\n", "")
    else:
        return key


def trimmer_price(key):
    # trim non-price from the key
    # INPUT: key (str)
    # OUTPUT: return the key without non-price
    if "$" in key:
        i = str(key).index("$")
        return str(key)[i:]
    else:
        return key


def trimmer_na(key):
    # trim N\A or N\\A from the key
    # INPUT: key (str)
    # OUTPUT: return the key without N\A or N\\A

    if key == "N\A" or key == "N\\A":
        return "No"

    if "N\A" in key:
        return str(key).replace("N\A", "")
    elif "N\\A" in key:
        return str(key).replace("N\\A", "")
    else:
        return key


def extractKey(target):
    # extract key from a dictionary
    # INPUT: target (dict)
    # OUTPUT: return a string that contains all keys from the input dict
    r = ""
    for key, val in target.items():
        temp = trimmer_underscore(key)
        temp = trimmer_nextline(temp)
        r += temp + ", "

    return r[:-2]


def arr2str(target):
    # convert arr to string
    # INPUT: target (arr)
    # OUTPUT: return a str

    l_arr = len(target)

    if l_arr == 1:
        return target[0]
    elif l_arr == 0:
        return "None"
    else:
        return ', '.join(trimmer_nextline(e) for e in target)
    

def parseCollegeRanking(target):
    # parse college ranking dict
    # INPUT: terget (dict) contains college ranking info
    # OUTPUT: returns arr dict

    result = []
    for key, val in target.items():
        temp = trimmer_underscore(key)
        temp = trimmer_nextline(temp)
        result.append({temp: val})
    
    return result

