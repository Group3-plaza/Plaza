#!/usr/bin/env bash

echo "Setting up Plaza"
echo "******************"
echo ""

# if ! cd "react-starter-main" &> /dev/null ; then
#     echo ""
#     echo "**** Unable to open 'react-starter-main' folder. Make sure you are in ./Plaza when running this script"
#     exit 1
# fi

echo ""
echo "(npm install)"
echo "******************"

if ! npm install ; then
    echo ""
    echo "**** Unable to run npm install"
    exit 1
fi

echo ""
echo "(npm install eslint-config-airbnb)"
echo "******************"

if ! npm install eslint-config-airbnb ; then
    echo ""
    echo "**** Unable to run npm install eslint-config-airbnb"
    exit 1
fi


echo ""
echo "(pip install -r requirements.txt)"
echo "******************"

if command -v pip &> /dev/null ; then
    pip install -r "requirements.txt"
else
    echo ""
    echo "**** Unable to find pip, trying pip3..."
    if command -v pip3 &> /dev/null ; then
        pip3 install -r "requirements.txt"
    else
        echo ""
        echo "**** Unable to find pip3, do you have pip installed?"
        exit
    fi
fi


echo ""
echo "(Webpack config)"
echo "******************"

if echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local ; then
    echo "DANGEROUSLY_DISABLE_HOST_CHECK"
fi
if echo "DISABLE_ESLINT_PLUGIN=true" >> .env.development.local ; then 
    echo "DISABLE_ESLINT_PLUGIN"
fi

echo ""
echo "******************"
echo "DONE! Run following commands to start server:"
echo " - npm run start"
echo " - python app.py"
echo ""