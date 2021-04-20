# Plaza

## Heroku Link

You can view the application at http://group3-plaza.herokuapp.com/

## Setup

Run `RUNME.sh` which will set everything up

OR

- `npm install`
- `pip install -r requirements.txt`

To prevent _Invalid Host Header_ error:

- `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local`

## Run Application
1. Run command in terminal (in your project directory): `python app.py`
2. Run command in another terminal, `cd` into the project directory, and run `npm run start`
3. Preview web page in browser '/'

## Deploy to Heroku
*Don't do the Heroku step for assignments, you only need to deploy for Project 2*
1. Create a Heroku app: `heroku create --buildpack heroku/python`
2. Add nodejs buildpack: `heroku buildpacks:add --index 1 heroku/nodejs`
3. Push to Heroku: `git push heroku main`