#!/bin/bash

echo "app.py"
pylint --rcfile=standard.rc app.py
echo "CanvasState.py"
pylint --rcfile=standard.rc canvasstate.py