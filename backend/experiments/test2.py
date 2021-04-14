import re,requests,random

ua_list = []
userlist=re.sub('\r\n', '\n', str(requests.get('http://pastebin.com/raw/VtUHCwE6').text)).splitlines()
for x in userlist:ua_list.append(x)
random.shuffle(ua_list)
def get_useragent():return(str(random.choice(ua_list)))
pers_UA=get_useragent()

print(pers_UA)