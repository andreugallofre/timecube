import json
import time
import requests

API_ENDPOINT = "http://10.105.112.73:8080/api/cube/canvi"

def process (data, cara):
    if data["accel_z"] < -14000:
        return 2
    elif data["accel_y"] < -14000:
        return 3
    elif data["accel_x"] < -14000:
        return 4
    elif data["accel_z"] > 14000:
        return 0
    elif data["accel_y"] > 14000:
        return 1
    elif data["accel_x"] > 14000:
        return 5
    
    return cara

def send_request (old, new):
    if old == -1:
        r = requests.post(url = API_ENDPOINT, json={"code": 1234, "actual": new})
    else:
        r = requests.post(url = API_ENDPOINT, json={"code": 1234, "anterior": old, "actual": new})
    print(r)
    return r

old_cara = 0
cara = 0
new_cara = 0
first = True

while True:
    time.sleep(1)

    with open('data.txt') as json_file:
        data = json_file.read()
        #print(data)
        json_data = json.loads(data)
        
    new_cara = process(json_data, cara)

    if cara != new_cara:
        old_cara = cara
        cara = new_cara
        print("Cara actual: " + str(cara) + " Cara antiga: " + str(old_cara))
        #Send request
        if first:
            send_request( -1, cara)
            first = False
        else:
            send_request(old_cara, cara)
