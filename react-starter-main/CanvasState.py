import struct
from datetime import datetime

BoardSize = 10 #board is nxn
CurrentCanvasState = bytearray([12 for i in range(BoardSize*BoardSize)])#default number. Just means all white. 
def readState():
    Read_Bin = open("CanvasBin", "rb")
    Bin_line = Read_Bin.readline()
    for i in range(len(Bin_line)):
        CurrentCanvasState[i] = Bin_line[i]
    #print(CurrentCanvasState)
    Read_Bin.close()
    
def getState():
    return CurrentCanvasState

def setPixel(time, x_cord, y_cord, color):
    hist_file = open("History_File","ab")
    write_arr = bytearray([color, x_cord, y_cord, time])
    hist_file.write(write_arr)
    hist_file.close()
    #print(write_arr)
    CurrentCanvasState[x_cord+(y_cord*BoardSize)] = color
    print(CurrentCanvasState)

def writeState():
    bin_file = open("CanvasBin", "wb") #unsure if we should replace the entire file or just append to the end.
    
    bin_file.write(CurrentCanvasState)
    bin_file.close()
    #write something


#Test below for the write stage.

#if we need to unpack print(struct.unpack("{}B".format(BoardSize*BoardSize),gaze[i]))
#CurrentCanvasState[1] = 4
#print(CurrentCanvasState)
#readState()
#print(getState())
