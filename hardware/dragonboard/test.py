import serial.tools.list_ports
myports = [tuple(p) for p in list(serial.tools.list_ports.comports())]
print(myports)