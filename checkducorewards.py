#this code gets executed every 30 minutes and creates a JSON file containing all current Duco rewards per device group
import urllib.request
import urllib.parse
import json
import time
#Helpers which mine for the dashboard users and get their duco paid back automatically
maintainers = ["user", "user", "user", "user", "user"]
#usernames of the 4 dashboard mining accounts for testing
usernames = ["dashaccesp32", "dashaccesp8266", "dashaccavr", "dashaccpi"]
#passwords
passwords = ["no", "dont", "even", "think about it"]
#dailycoins default values
dailycoins = [0,0,0,0]
i = 0
try:
    #Iterate throught all accounts
    for name in usernames:
        time.sleep(2)
        #Get balance of the account
        url1 = "https://server.duinocoin.com/balances/" +  name
        with urllib.request.urlopen(url1) as url:
            balance = json.load(url)["result"]["balance"]
            #Calculate daily ducos based from 30min of mining
            dailycoins[i]=balance*96
            #If there are less than 0.001 coins set the value to 0 to prevent bad json readings
            if(dailycoins[i]<0.001):
                dailycoins[i]=0
            #Send ducos to the user is balance is higher than 0,001
            if(balance>0.001):
                print("account: " + name + " has a balance of: " + str(balance) + " Starting transacrio...")
                #A little bit less to send because api gives back rounded balance
                realbalance = balance - balance*0.0001
                #Send to user
                url1 = "https://server.duinocoin.com/transaction/?username=" + name + "&password=" + urllib.parse.quote(passwords[i]) + "&recipient=" + urllib.parse.quote(maintainers[i]) + "&amount=" + str(realbalance) + "&memo=" + urllib.parse.quote("Thanks for supporting the rewards-test")
                with urllib.request.urlopen(url1) as url:
                    if("OK" in json.load(url)["result"]):
                        print("transation successfull")
                    else:
                        print("error" + json.load(url))
            else:
                print("account: " + name + " has a balance of: 0.0 No transaction required")
            time.sleep(0.1)
            i+=1
except:
    print("error in code execution")
#Create JSON file
data= {}
data["esp32"]={"dailycoins": dailycoins[0], "weeklycoins": dailycoins[0]*7, "monthlycoins": dailycoins[0]*30}
data["esp8266"] = {"dailycoins": dailycoins[1], "weeklycoins": dailycoins[1]*7, "monthlycoins": dailycoins[1]*30}
data["avr"] = {"dailycoins": dailycoins[2], "weeklycoins": dailycoins[2]*7, "monthlycoins": dailycoins[2]*30}
data["pc/pi"] = {"dailycoins": dailycoins[3], "weeklycoins": dailycoins[3]*7, "monthlycoins": dailycoins[3]*30}
data["lastupdate"] = time.time()
#'Write to jsonfile'
with open('ducorewards.json', 'w', encoding='utf-8') as file:
    json.dump(data, file)