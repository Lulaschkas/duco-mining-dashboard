#This python code is used to ping all duco services and create a json file with online/offline services
import urllib.request
import json
import time
import socket
from websocket import create_connection

def api(restapi):
    maxretrys=0
    print("---Testing REST-API :")
    while restapi != True and maxretrys<4:
        
        print("Testing with try number:" + str(maxretrys))
        maxretrys+=1
        try:
            url1 = "https://server.duinocoin.com/statistics"
            with urllib.request.urlopen(url1) as url:
                data = json.loads(url.read().decode())
                restapi = True
                print("❤️ online")
                return restapi
        except:
            print("Accessing API failed")
    if(restapi!=True):
        return False
def website(website_ping):
    maxretrys=0
    print("---Testing website:")
    while website_ping != True and maxretrys<4:
        print("Testing with try number:" + str(maxretrys))
        maxretrys+=1
        try:
            url2 = "https://duinocoin.com"
            with urllib.request.urlopen(url2) as url:
                if(url.getcode()==200):
                    website_ping=True
                    print("❤️ online")
                    return website_ping
        except:
            print("Accessing website failed")
    if(website_ping!=True):
        return False

def vps(vps_web):
    maxretrys=0
    print("---Testing VPS:")
    while vps_web != True and maxretrys<4: 
        print("Testing with try number:" + str(maxretrys))
        maxretrys+=1
        try:
            url2 = "https://server.duinocoin.com"
            with urllib.request.urlopen(url2) as url:
                if(url.getcode()==200):
                    vps_web=True
                    print("❤️ online")
                    return vps_web
        except:
            print("Accessing VPS website failed")
    if(vps_web!=True):
        return False
def node(noder_mining):
    print("---Testing node-1 connection:")
    maxretrys = 0
    while noder_mining != True and maxretrys<4:
        print("Testing with try number:" + str(maxretrys))
        try:
            maxretrys+=1
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 
            s.settimeout(15)
            s.connect(("149.91.88.18", 6000)) 
            msg = s.recv(1024)
            if(msg.decode("utf-8") != ""):
                noder_mining = True
                print("❤️ online")
                return noder_mining
            s.close()

        except:
            print("Accessing node failed")
    if(noder_mining!=True):
        return False

def wallet(wallet_sock):
    print("---Testing wallet connection:")
    maxretrys = 0
    while wallet_sock != True and maxretrys<5:
        print("Testing with try number:" + str(maxretrys))
        try:
            maxretrys+=1
            ws = create_connection("wss://server.duinocoin.com:15808")
            result =  ws.recv()
            ws.send("LOGI,dashboard,notmyrealpass")
            result =  ws.recv()
            if(result != ""):
                wallet_sock = True
                print("❤️ online")
                return wallet_sock
            ws.close()
        except:
            print("Cannot access server")
    if(wallet_sock!=True):
        return False
    
def mining(mining_main):
    print("---Testing General mining ports")
    try:
        i = 0
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 
        s.settimeout(20)
        try:
            s.connect(("server.duinocoin.com", 2811)) 
            msg = s.recv(1024)
            if(msg.decode("utf-8") != ""):
                i+=1
                print(f"❤️ online ({i}/3)")
            s.close()
        except:
            print("error")
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 
        s.settimeout(20)
        try:
            s.connect(("server.duinocoin.com", 2812)) 
            msg = s.recv(1024)
            if(msg.decode("utf-8") != ""):
                i+=1
                print(f"❤️ online ({i}/3)")
            s.close()
        except:
            print("error")
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 
        s.settimeout(20)
        try:
            s.connect(("server.duinocoin.com", 2813)) 
            msg = s.recv(1024)
            if(msg.decode("utf-8") != ""):
                i+=1
                print(f"❤️ online ({i}/3)")
            s.close()
        except:
            print("error")
        if(i>=1):
            print(f"❤️ online - final -  (3/3)")
            mining_main=True
            return mining_main
    except Exception as e:
        print("Accessing main mining ports failed: ")
    if(mining_main!=True):
        return False
def leg_wallet(legacy_wallet):
    print("---Testing legacy wallet connection:")
    try:
        i=False
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 
        s.settimeout(15)
        s.connect(("server.duinocoin.com", 2809)) 
        msg = s.recv(1024)
        if(msg.decode("utf-8") != ""):
            print("❤️ online")
            i=True
        s.close()
        if(i):
            return True
    except:
        print("Accessing legacy wallet ports failed")
    if(i!=True):
        return False

if __name__ == "__main__":
    esp_since = 0
    wallet_since = 0
    website_since = 0
    api_since = 0
    node_since = 0
    mining_since =0
    vps_since =0
    legacy_wallet = False
    restapi = False
    website_ping = False
    vps_web = False
    noder_mining = False
    wallet_sock =False
    mining_main = False
    mining_main = mining(mining_main)
    wallet_sock = wallet(wallet_sock)
    vps_web = vps(vps_web)
    restapi = api(restapi)
    noder_mining = node(noder_mining)
    website_ping = website(website_ping)
    legacy_wallet = leg_wallet(legacy_wallet)
    print(f"Summary: \n ESP: {legacy_wallet} \n mining: {mining_main} \n wallet: {wallet_sock} \n api: {restapi} \n node: {noder_mining} \n Website: {website_ping} \n VPS: {vps_web}")
    
    
    with open('/var/www/duco/ducostats.json', 'r') as f:
        data = json.load(f)
        if(data["wallet"]["online"] != wallet_sock):
            wallet_since = time.time()
        else:
            wallet_since = data["wallet"]["since"]
        if(data["api"]["online"] != restapi):
            api_since = time.time()
        else:
            api_since = data["api"]["since"]
        if(data["mining"]["online"] != mining_main):
            mining_since = time.time()
        else:
            mining_since = data["mining"]["since"]
        if(data["node"]["online"] != noder_mining):
            node_since = time.time()
        else:
            node_since = data["node"]["since"]
        if(data["website"]["online"] != website_ping):
            website_since = time.time()
        else:
            website_since = data["website"]["since"]
        if(data["vps"]["online"] != vps_web):
            vps_since = time.time()
        else:
            vps_since = data["vps"]["since"]
        if(data["software_wallet"]["online"] != legacy_wallet):
            legacy_wallet_since = time.time()
        else:
            legacy_wallet_since = data["software_wallet"]["since"]
    data["software_wallet"]["online"] = legacy_wallet
    data["software_wallet"]["since"] = legacy_wallet_since
    data["wallet"]["online"] = wallet_sock
    data["wallet"]["since"] = wallet_since
    data["website"]["online"] = website_ping
    data["website"]["since"] = website_since
    data["api"]["online"] = restapi
    data["api"]["since"] = api_since
    data["node"]["online"] = noder_mining
    data["node"]["since"] = node_since
    data["mining"]["online"] = mining_main
    data["mining"]["since"] = mining_since
    data["vps"]["online"] = vps_web
    data["vps"]["since"] = vps_since
    data["lastupdate"] = int(time.time())
    with open('/var/www/duco/ducostats.json', 'w', encoding='utf-8') as file:
        json.dump(data, file)

