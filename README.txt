# GentriMap
## Project Notes
GentriMap is an ongoing project to map gentrification in Berlin, Germany, using fine grained data to track changes in the real estate market and the socio-demographic composition of the city. This project was initiated by Andrej Holm and the GentriMap team at Humboldt University. In 2017, this project received funding from the Federal Ministry of Education and Research (BMBF) via the Prototypefund program (https://prototypefund.de).

You can see the current status of this project at https://gentrimap.herokuapp.com.

If you would like to know more about this project or work with the data or maps please contact melaniethewlis at littlewebgiants dot com.

## App Notes
GentriMap is powered by a PostGIS database. There is a NodeJS application serving the backend and the frontend is an Ember app.

### Get your own version up and running
Download an export of the database and import into a new PostSQL database.

- `$ git clone https://github.com/melmo/gentrimap-v2`
- `$ cd gentrimap-v2`
- `$ npm install`
- Edit queries.js:9 to match your database credentials where "postgres://user:password@host:port/database"
- `$ npm start`

This will launch the Node application on localhost:3000. You should be able to visit localhost:3000/api/bezirke/demographie and see data.

In a new console:
- `$ cd gentrimap-v2/frontend`
- `$ ember server`

This will start the Ember application on localhost:4200

### Extending the datasets
- There are four geodata tables that correspond to the different levels of Berlin's planning system.
- You can load in new data sets so long as you have a primary key that corresponds to the numbering system of the relevant levels
- Add a new route to the API in routes/index.js and queries.js
- Clone the data/demogrphie model and the ebene/data/demographie-main controller in Ember to suit your needs

### Deploying to Heroku
- Create Heroku app and install PostSQL Add On
- `$ heroku buildpack:set https://github.com/andrewbranch/heroku-buildpack-nodejs-ember.git -a gentrimap`
- Follow standard deployment instructions: https://devcenter.heroku.com/articles/git
- Use pg:push to push local database to Heroku: https://devcenter.heroku.com/articles/heroku-postgresql#using-the-cli You may need to do pg:dump then pg:restore if you are on Windows. See https://stackoverflow.com/questions/37494463/heroku-pgpush-psql-fatal-password-authentication-failed-for-user