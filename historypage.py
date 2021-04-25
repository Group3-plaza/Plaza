"""
Cretates the gif by reading from History_File and creating .png file for each changes
and converting them into numpy array
"""
import os
import imageio
import numpy
from PIL import Image

BOARD_SIZE = 50 #board is nxn

def to_rgb(index):
    """Return given index into it's respectinve color in rgb"""
    rgb_val = {
        0:(255, 0, 0),
        1:(255, 80, 0),
        2:(255, 150, 0),
        3:(255, 200, 66),
        4:(255, 255, 0),
        5:(120, 180, 50),
        6:(0, 255, 0),
        7:(13, 152, 186),
        8:(0, 0, 255),
        9:(138, 43, 226),
        10:(238, 130, 238),
        11:(199, 21, 133),
        12:(255, 255, 255),
        13:(0, 0, 0)
    }
    return rgb_val.get(index)


def generate_history():
    """Starts with white board and add to all the changes made one at time,
    then feed that array to imageio to convert it into gif"""
    file = open("History_File", 'rb')
    history = file.read()
    file.close()

    data = []
    for val in history:
        data.append(int(val))


    #white board
    board = numpy.array([[(255, 255, 255)]*BOARD_SIZE]*BOARD_SIZE, dtype=numpy.uint8)

    image = Image.fromarray(board)
    image.save('./history/start.png')

    change = 0
    for i in range(0, len(data), 3):
        image.putpixel((data[i], data[i+1]), to_rgb(data[i+2]))
        image.save('./history/change'+str(change)+'.png')
        change += 1

    images = []
    filelist = os.listdir('./history')
    for files in filelist:
        images.append(imageio.imread('./history/'+files))

    imageio.mimsave('./src/graphics/changes.gif', images, 'GIF', fps=12)
