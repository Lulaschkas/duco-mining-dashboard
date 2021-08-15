#This simple python code gets data from the duco api, creates a JSON file and writes how many new users signed up per day
import urllib.request
import json
import time
from datetime import date
today = date.today()

#Set time format
date = today.strftime("%d.%m.%Y")
api = False
maxretrys=0
#4 trys to access the api
print("Starting and accessing API please wait...")
while api != True and maxretrys<4:
    print("Testing with try number:" + str(maxretrys))
    maxretrys+=1
    try:
        url1 = "https://server.duinocoin.com/statistics"
        with urllib.request.urlopen(url1) as url:
            data = json.loads(url.read().decode())
            api = True
            print("❤️ online and loaded the data")
    except:
        print("Accessing API failed")
#Check if there already is an entry for today and get users from yesterday
with open("/var/www/duco/dailynewusers.json", "r", encoding="utf-8") as file:
    json_dates = json.load(file)
    for element in json_dates:
        print(element)
        if(element == date):
            print("Already an entry for today - exiting")
            exit()

dailynew = data["Registered users"] - json_dates[element]["users"]
arr1 = {date: {"users": data["Registered users"], "new": dailynew}}
json_dates.update(arr1)
#Write to JSON file
with open("/var/www/duco/dailynewusers.json", "w", encoding="utf-8") as file:
    json_object = json.dumps(json_dates, indent=4)
    file.write(json_object)
