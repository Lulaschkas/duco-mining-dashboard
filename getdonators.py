import json
from os import times
from time import time
import urllib.request
from datetime import datetime
import re
with open("/var/www/duco/faucetinfo.json", "r", encoding='utf-8') as jsonFile:
    data1 = json.load(jsonFile)
url1 = "https://server.duinocoin.com/users/dashboard"
with urllib.request.urlopen(url1) as data:
    data = json.load(data)
    for elements in data["result"]["transactions"]:
        timestamp = datetime.strptime(elements["datetime"], "%d/%m/%Y %H:%M:%S").timestamp()
        now = datetime.now().timestamp() - 7200
        if(now-timestamp <60 and "dashboard" not in elements["sender"] and re.match(r"^[A-Za-z0-9_-]*$", elements["sender"])):
            print("Adding new user to donations")
            if(elements["sender"] in data1["donators"]):
                data1["donators"][elements["sender"]]["duco"] += round(elements["amount"],2)
                data1["donators"][elements["sender"]]["time"] = now
            else:
                print("notindata")
                data1["donators"][elements["sender"]]= {"duco": round(elements["amount"],2), "time": now}
    print(data1)
    with open('/var/www/duco/faucetinfo.json', 'w', encoding='utf-8') as file:
        json.dump(data1, file)
                
