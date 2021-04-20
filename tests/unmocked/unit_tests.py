import unittest
import unittest.mock as mock
from unittest.mock import patch
import random
import os
import sys

sys.path.append(os.path.abspath('../..'))
from app import get_canvas, add_row
import CanvasState

KEY_INPUT = 'input'
KEY_EXPECTED = 'expected'

param_arr = [12, 25, 16, 49, 4]

EXPECTED_CANVAS = bytearray([12 for i in range(CanvasState.BoardSize**2)])
EXPECTED_CANVAS[param_arr[2]+(param_arr[3]*CanvasState.BoardSize)] = param_arr[4]

class byteArrayTests(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                 KEY_INPUT: param_arr,
                 KEY_EXPECTED: EXPECTED_CANVAS,
             }
            ]
            
    def correctArray(self):
        for test in self.success_test_params:
            
            actual_result = CanvasState.setPixel(param_arr[0], param_arr[1],param_arr[2],param_arr[3], param_arr[4])
            expected_result = test[KEY_EXPECTED]
            
            self.assertEqual(len(actual_result), len(expected_result))
            self.assertEqual(actual_result[3], expected_result[3])

class writeToFileTest(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                 KEY_INPUT: param_arr,
                 KEY_EXPECTED: EXPECTED_CANVAS,
             }
            ]
            
    def correctFile(self):
        for test in self.success_test_params:
            
            actual_result = CanvasState.setPixel(param_arr[0], param_arr[1],param_arr[2],param_arr[3], param_arr[4])
            expected_result = test[KEY_EXPECTED]
            
            self.assertEqual(len(actual_result), len(expected_result))
            self.assertEqual(actual_result, expected_result)
    
    
if __name__ == '__main__':
    unittest.main()