#This python code is used to ping all duco services and create a json file with online/offline services
import urllib.request
import json
import time
import socket
from websocket import create_connection
import os
hostnames = {
    #websites
    "website": "https://duinocoin.com",
    "api": "https://server.duinocoin.com/users/revox",
    "masterweb": "https://server.duinocoin.com/",
}
pools = {
    "bilapool": {
        "ip": "51.158.113.59",
        "port": 6042
    },
    "beyondpool": {
        "ip": "50.112.145.154",
        "port": 6002
    },
    "svkopool": {
        "ip": "5.230.69.132",
        "port": 6000
    },
    "starpool":{
        "ip": "51.158.182.90",
        "port": 6006
    }
}
online = {
    "website": False,
    "api": False,
    "bilapool": False,
    "beyondpool": False,
    "svkopool": False,
    "starpool": False,
    "masterweb": False,
}

since = {
    "website": False,
    "api": False,
    "bilapool": False,
    "beyondpool": False,
    "svkopool": False,
    "starpool": False,
    "masterweb": False,
}

def checkanode(nodeobj):
    maxretrys = 0
    node= False
    while node != True and maxretrys<2:
        try:
            print("Testing %s with try number:" % nodeobj + str(maxretrys))
            maxretrys+=1
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 
            s.settimeout(10)
            s.connect((nodeobj["ip"], nodeobj["port"])) 
            msg = s.recv(1024)
            if(msg.decode("utf-8") != ""):
                s.close()
                print("Accessing successfull")
                node = True
                return node
        except:
            print("error")
    return False
def checkweb(hostname):
    maxretrys=0
    web = False
    while web != True and maxretrys<4: 
        try:
            print("Testing %s with try number:" % hostname + str(maxretrys))
            maxretrys+=1

            url = hostname
            req = urllib.request.Request(
                url, 
                data=None, 
                headers={
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36'
                }
            )
            with urllib.request.urlopen(req) as url2:
                if(url2.getcode()==200):
                    web=True
                    print("Accessing successfull")
                    return web
        except:
            print("error")
    return False
if __name__ == "__main__":
    for elements in pools:
        if checkanode(pools[elements]):
            online[elements]=True
    for elements in hostnames:
        if checkweb(hostnames[elements]):
            online[elements]=True
    with open('ducostats.json', 'r') as f:
        data = json.load(f)
        for elements in data:
            if(elements != "lastupdate"):
                if data[elements]["online"] != online[elements]:
                    since[elements]=time.time()
                else:
                   since[elements]=data[elements]["since"]
    for x in online:
        data[x]["online"]=online[x]
        data[x]["since"]=since[x]
    data["lastupdate"] = int(time.time())
    with open('ducostats.json', 'w', encoding='utf-8') as file:
        json.dump(data, file)

    