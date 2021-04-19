import unittest
import unittest.mock as mock
from unittest.mock import patch
import random
import os
import sys

sys.path.append(os.path.abspath('../..'))
from app import get_canvas, add_row, models
import CanvasState


KEY_INPUT = "input"
KEY_EXPECTED = "expected"

COLOR = 11

KEY_TABLE = bytearray([random.randint(0, 12) for i in range(CanvasState.BoardSize**2)])

class SettingCurrentCanvasTest(unittest.TestCase):
    def setUp(self):
        self.add_one = [
            {
                KEY_INPUT: { 
                    "x": 34, 
                    "y": 12, 
                    "color": 11 
                    
                },
                KEY_EXPECTED: COLOR,
            },
            
        ]
        
        initial_canvas = models.Canvas()
        self.initial_db_mock = [initial_canvas]
        
    def mocked_db_session_add(self, color):
        self.initial_db_mock.append(color)
    
    def mocked_db_session_commit(self):
        pass
    
    def mocked_canvas_query_all(self):
        return self.initial_db_mock
    
    def successfulAdd(self):
        for test in self.add_one:
            with patch('app.db.session.add', self.mocked_db_session_add):
                with patch('app.db.session.commit', self.mocked_db_session_commit):
                    with patch('models.Canvas.query') as mocked_query:
                        mocked_query.all = self.mocked_canvas_query_all
                 
                        print(self.initial_db_mock)  
                        
                        actual_result = add_row(test[KEY_INPUT])
                        expected_result = test[KEY_EXPECTED]
                        
                        print(self.initial_db_mock)  
                        print(expected_result)
                        self.assertEqual(actual_result, expected_result)

class GettingCurrentCanvasTest(unittest.TestCase):
    def setUp(self):
        self.add_one = [
            {
                KEY_EXPECTED: KEY_TABLE,
            },
            
        ]
        
        INITIAL_ARRAY = []
        x = 0;
        y = 0
        for user in KEY_TABLE:
            INITIAL_ARRAY.append(models.Canvas(hours=5, x_cord=x, y_cord=y, color=KEY_TABLE[x+(y*CanvasState.BoardSize)]))
            x += 1
            if (x > 50):
                x = 0
                y += 1
        
        self.initial_db_mock = [INITIAL_ARRAY]
    

        
    def successfulChange(self):
        for test in self.add_one:
            print(self.initial_db_mock) 
            arr = self.initial_db_mock
            currentState = bytearray([12 for i in range(CanvasState.BoardSize**2)])
            history = self.initial_db_mock
            
            for i in range(len(history)): 
                currentState[arr[i][1]+(arr[i][2]*CanvasState.BoardSize)] = arr[i][3]
                
            actual_result = get_canvas()
            expected_result = test[KEY_EXPECTED]
            self.assertEqual(actual_result, expected_result)

if __name__ == '__main__':
    unittest.main()