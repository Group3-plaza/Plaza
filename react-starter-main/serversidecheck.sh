#!/bin/bash

echo "app.py"
pylint --rcfile=standard.rc app.py
echo "models.py"
pylint --rcfile=standard.rc CanvasState.py