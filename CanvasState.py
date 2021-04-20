'''These functions are essential for the canvas board, read/write/set/get'''
import os

BoardSize = 50 #board is nxn
CurrentCanvasState = [] #default number. Just means all white.
def readState():
    #Reads the current Canvas State.
    global CurrentCanvasState
    read_bin = open("CanvasBin", "rb")
    bin_line = read_bin.readline()
    #print(len(bin_line))
    CurrentCanvasState = bytearray(bin_line)
    print(len(CurrentCanvasState))
    #print(len(CurrentCanvasState))
    #print(CurrentCanvasState)
    read_bin.close()
def getState():
    global CurrentCanvasState
    #print("State len: {}".format(len(CurrentCanvasState)))
    return CurrentCanvasState

def setPixel(mins, secs, x_cord, y_cord, color):
    '''Sets the pixel state and writes to a history file.'''
    print("mins:{} secs:{} x_cord:{} y_cord:{} color:{}".format(mins, secs, x_cord, y_cord, color))
    global CurrentCanvasState
    hist_file = open("History_File", "w+")
    write_arr = str([color, x_cord, y_cord, mins, secs])
    hist_file.write(write_arr)
    hist_file.close()
    #print(write_arr)
    print(len(CurrentCanvasState))
    print("CanvasType: {}".format(type(CurrentCanvasState)))
    print("Color type: {}".format(type(color)))
    print("X_cord={} Y Cord = {} BoardSize = {}".format(x_cord, y_cord, BoardSize))
    print("Writing to coord {}".format(x_cord+(y_cord*BoardSize)))
    CurrentCanvasState[x_cord+(y_cord*BoardSize)] = color
    
    return CurrentCanvasState
    #writeState()
def writeState():
    '''WRites to the binary file.'''
    global CurrentCanvasState
    bin_file = open("CanvasBin", "wb")
    bin_file.write(CurrentCanvasState)
    bin_file.close()
if __name__ != "__app__":
    print("In app.")
    if os.path.exists("CanvasBin"):
        print("File detected. Reading bytes.")
        readState()
    else:
        CurrentCanvasState = bytearray([12 for i in range(BoardSize**2)])