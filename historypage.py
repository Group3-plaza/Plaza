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
    #white board
    board = numpy.array([[(255, 255, 255)]*BOARD_SIZE]*BOARD_SIZE, dtype=numpy.uint8)

    image = [Image.fromarray(board)]

    try:
        file = open("History_File", 'rb')
        history = file.read()
        file.close()

        # convert from byte to int and inset of [ x, y, color] cord
        data = []
        cord = []
        for val in history:
            if len(cord) < 2:
                cord.append(int(val))
            else:
                cord.append(int(val))
                data.append(cord)
                cord = []

        for cord in data:
            board[cord[0]][cord[1]] = to_rgb(cord[2])
            image.append(Image.fromarray(board))

    except FileNotFoundError:
        print("no histroy at the moment!\nCreating basic board.")
    finally:
        image[0].save(
            './src/graphics/changes.gif',
            save_all=True,
            append_images=image[1:],
            duration=50,
            loop=0,
            )
        print("New GIF created!")
