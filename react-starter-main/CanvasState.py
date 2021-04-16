import struct
from datetime import datetime
import os

BoardSize = 50#board is nxn
CurrentCanvasState = [] #default number. Just means all white. 


def readState():
    global CurrentCanvasState
    Read_Bin = open("CanvasBin", "rb")
    Bin_line = Read_Bin.readline()
    #for i in range(len(Bin_line)):
        #CurrentCanvasState[i] = Bin_line[i]
    CurrentCanvasState = bytearray(Bin_line)
    print(len(CurrentCanvasState))
    #print(len(CurrentCanvasState))
    #print(CurrentCanvasState)
    Read_Bin.close()
    
def getState():
    global CurrentCanvasState

    #print("State len: {}".format(len(CurrentCanvasState)))
    return CurrentCanvasState

def setPixel(mins, secs, x_cord, y_cord, color):
    global CurrentCanvasState
    hist_file = open("History_File","ab")
    write_arr = [color, x_cord, y_cord, mins,secs]
    hist_file.write(write_arr)
    hist_file.close()
    #print(write_arr)
    CurrentCanvasState[x_cord+(y_cord*BoardSize)] = color
    print(CurrentCanvasState)

def writeState():
    global CurrentCanvasState
    bin_file = open("CanvasBin", "wb") #unsure if we should replace the entire file or just append to the end.
    
    bin_file.write(CurrentCanvasState)
    bin_file.close()
    #write something
if __name__ != "__app__":
    print("In app.")
    if os.path.exists("CanvasBin"):
        print("File detected. Reading bytes.")
        readState()
    else:
        CurrentCanvasState = bytearray([12 for i in range(BoardSize**2)])



#Test below for the write stage.

#if we need to unpack print(struct.unpack("{}B".format(BoardSize*BoardSize),gaze[i]))
#CurrentCanvasState[1] = 4
#print(CurrentCanvasState)
#readState()
#print(getState())
