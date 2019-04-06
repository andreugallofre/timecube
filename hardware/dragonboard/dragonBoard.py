import syslog
import time
import serial
import json
import threading

def read_from_port (ser):
    while True:
        if ser.isOpen():
            try:
                rawLigne = serial.readline()
                if rawLigne != "" and rawLigne[0] == '{' :
                    tempeData = json.loads(rawLigne)
                    print(tempeData)
            except:
                pass

serial = serial.Serial("/dev/cu.usbmodem145301", 19200, timeout=1)
thread = threading.Thread(target=read_from_port, args=(serial,))
thread.start()

