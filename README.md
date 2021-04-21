# Plaza

![Plaza Logo](Plaza.png)

Plaza is a web-application powered by Flask, ReactJS, and PostgreSQL that lets anyone contribute pixel-by-pixel to a canvas visible to the world.

## Heroku Link

You can view the application at http://group3-plaza.herokuapp.com/

## Setup

Run `RUNME.sh` which will set everything up

OR

- `npm install`
- `pip install -r requirements.txt`

To prevent _Invalid Host Header_ error:

- `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local`

## Requirements

1. Flask
2. React
3. python-dotenv
4. Flask-SQLAlchemy


## Linting

- ESLINT:
  - Made intentations 4 spaces instead of 2
  - Allowed jsx code in .js files
  - Allowed dynamic imports to fix linting issues in reportWebVitals.js by setting `ecmaVersion=11`
  - Allowed references to `document` in javascript code
