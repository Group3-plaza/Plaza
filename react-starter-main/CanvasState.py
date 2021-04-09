import struct
BoardSize = 6 #board is nxn
CurrentCanvasState = bytearray([0 for i in range(BoardSize*BoardSize)])#default number. Just means all white. 
def readState():
    Read_Bin = open("CanvasBin", "rb")
    Bin_line = Read_Bin.readline()
    for i in range(len(Bin_line)):
        print(Bin_line[i],end=" ")
        CurrentCanvasState[i] = Bin_line[i]
    print(CurrentCanvasState)
    Read_Bin.close()
    
    #do something
    print("z")
def getState():
    #get something
    print("e")
def setPixel(time, pixel, color):
    #set something
    print("d")
def writeState():
    bin_file = open("CanvasBin", "wb") #unsure if we should replace the entire file or just append to the end.
    
    bin_file.write(CurrentCanvasState)
    bin_file.close()
    #write something
    print("ree")

#writeState()
checker = open("CanvasBin", "rb")
gaze = checker.readlines()
#Test below for the write stage.

#if we need to unpack print(struct.unpack("{}B".format(BoardSize*BoardSize),gaze[i]))
#CurrentCanvasState[1] = 4
print(CurrentCanvasState)
readState()