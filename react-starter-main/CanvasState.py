import struct
BoardSize = 6 #board is nxn
CurrentCanvasState = bytearray([12 for i in range(BoardSize*BoardSize)])#default number. Just means all white. 
def readState():
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

writeState()
checker = open("CanvasBin", "rb")
gaze = checker.readlines()
#Test below for the write stage.
for i in range(len(gaze)):
    print(gaze[i])
    print(struct.unpack("{}B".format(BoardSize*BoardSize),gaze[i]))
#CurrentCanvasState[1] = 4
print(CurrentCanvasState)