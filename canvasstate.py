'''These functions are essential for the canvas board, read/write/set/get'''
import os

BOARD_SIZE = 50 #board is nxn
CURR_CANVASSTATE = [] #default number. Just means all white.
def read_state():
    '''Reads the current Canvas State.'''
    global CURR_CANVASSTATE
    read_bin = open("CanvasBin", "rb")
    bin_line = read_bin.readline()
    #print(len(bin_line))
    CURR_CANVASSTATE = bytearray(bin_line)
    #print(len(CURR_CANVASSTATE))
    #print(len(CurrentCanvasState))
    #print(CurrentCanvasState)
    read_bin.close()
    return CURR_CANVASSTATE

def set_pixel(mins, secs, x_cord, y_cord, color):
    '''Sets the pixel state and writes to a history file.'''
    print("mins:{} secs:{} x_cord:{} y_cord:{} color:{}".format(mins, secs, x_cord, y_cord, color))
    global CURR_CANVASSTATE
    hist_file = open("History_File", "w+")
    write_arr = str([color, x_cord, y_cord, mins, secs])
    hist_file.write(write_arr)
    hist_file.close()
    #print(write_arr)
    print(len(CURR_CANVASSTATE))
    print("CanvasType: {}".format(type(CURR_CANVASSTATE)))
    print("Color type: {}".format(type(color)))
    print("X_cord={} Y Cord = {} BoardSize = {}".format(x_cord, y_cord, BOARD_SIZE))
    print("Writing to coord {}".format(x_cord+(y_cord*BOARD_SIZE)))
    CURR_CANVASSTATE[x_cord+(y_cord*BOARD_SIZE)] = color
    #writeState()
def write_state():
    '''WRites to the binary file.'''
    global CURR_CANVASSTATE
    bin_file = open("CanvasBin", "wb")
    bin_file.write(CURR_CANVASSTATE)
    bin_file.close()
if __name__ != "__app__":
    print("In app.")
    if os.path.exists("CanvasBin"):
        print("File detected. Reading bytes.")
        read_state()
    else:
        CURR_CANVASSTATE = bytearray([12 for i in range(BOARD_SIZE**2)])
        