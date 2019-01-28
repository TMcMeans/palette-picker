
//setting the environment variables that the server runs on/ will default to a development enviornment 
const environment = process.env.NODE_ENV || 'development';

//fetch the database configuration from knexfile.js for the envoironment I am using 
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);


//set up express server 
const express = require('express')
const app = express()

//parse all incoming request bodies using bodyParser middleware
const bodyParser = require('body-parser')


//set up the port that app will run on
app.set('port', process.env.PORT || 3000)
//set global variable of app title
app.locals.title = 'Palette Picker'


//Serve up a static html file 
app.use(express.static('public'))
//parse all incoming request bodies using bodyParser middleware
app.use(bodyParser.json())


//set a path for POST request 
app.post('/api/v1/projects', (request, response) => {
  //assign project data to variable
  const project = request.body;


  //use a for/of loop to iterate over the assigned parameters of the data from the request. If the request.body doesn't include one of the required params (ex. project title) throw an error to log to the console specifiying that a required param is missing.
  for (let requiredParameter of ['title']) {
    if (!project[requiredParameter]) {
      return response.status(422).send({ error: `Expected format: { title: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  //Use knex methods to insert project data into the database
  database('projects').insert(project, 'id')
    //sendsome json if successful
    .then(project => {
      response.status(201).json({ id: project[0] });
    })
    //send an error if unsuccessful
    .catch(error => {
      response.status(500).json({ error });
    });
})


//set a path for GET request 
app.get('/api/v1/projects', (request, response) => {
  //select all of the project data from the database
  database('projects').select()
    //if successful send project data as json
    .then(projects => {
      response.status(200).json(projects);
    })
    //if unsuccessful send an error
    .catch(error => {
      response.status(500).json({ error })
    });
})

app.delete('/api/v1/projects/:id', (request, response) => {
  //Not part of MVP for this project but good for UI
})

//set a path to POST palettes to database
app.post('/api/v1/palettes', (request, response) => {
  //assign palette data to variable
  const palette = request.body

  //use a for/of loop to iterate over the assigned parameters of the data from the request. If the request.body doesn't include one of the required params (ex. project title) throw an error to log to the console specifiying that a required param is missing.
  for (let requiredParameter of ['color_1', 'color_2', 'color_3', 'color_4', 'color_5', 'project_id', 'title']) {
    if (!palette[requiredParameter]) {
      return response.status(422).send({ error: `Expected format: {  color_1: <string>, color_2: <string>, color_3: <string>, color_4: <string>, color_5: <string>, project_id: <number>, title: <String>, }. You're missing a "${requiredParameter}" property.` });
    }
  }

  //insert palette into database
  database('palettes').insert(palette, 'id')
    //if successful send palette id back
    .then(palette => {
      response.status(201).json({ id: palette[0] });
    })
    //if unsuccessul send an error
    .catch(error => {
      response.status(500).json({ error });
    });

})

app.get('/api/v1/palettes', (request, response) => {
  //find all data from the palettes table in the database
  database('palettes').select()
    .then(palettes => {
      //if successful send the palettes data
      response.status(200).json(palettes);
    })
    //if unsuccessful send an error
    .catch(error => {
      response.status(500).json({ error })
    });
})

app.delete('/api/v1/palettes/:id', (request, response) => {
  // database('palettes').where('id', request.params.id).del()

  //use knex method to find palette in database based on id, then delete from database
  knex('palettes')
    .where({ id: request.params.id })
    .del()
    .then(palettes => {
      //if successful send a string of success back
      response.status(200).json('success')
    })
    //if unsuccessul send and error
    .catch(error => {
      response.status(404).json({ error })
    })
})

//console log what port the app is running on when server runs
app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`)
})