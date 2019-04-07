import json
import time

def process (data, cara):
    if data["accel_z"] < -14000:
        return 3
    elif data["accel_y"] < -14000:
        return 4
    elif data["accel_x"] < -14000:
        return 5
    elif data["accel_z"] > 14000:
        return 1
    elif data["accel_y"] > 14000:
        return 2
    elif data["accel_x"] > 14000:
        return 6
    
    return cara

old_cara = 1
cara = 1
new_cara = 1

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
