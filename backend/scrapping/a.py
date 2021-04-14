from scrap_log import read_url

a = read_url()
a = a.split("\n")

for item in a:
    print(item)