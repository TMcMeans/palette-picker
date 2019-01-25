const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Palette Picker'

app.use(express.static('public'))
app.use(bodyParser.json())

app.post('/api/v1/projects', (request, response) => {
  const project = request.body;

  for (let requiredParameter of ['title']) {
    if (!project[requiredParameter]) {
      return response.status(422).send({ error: `Expected format: { title: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('projects').insert(project, 'id')
    .then(project => {
      response.status(201).json({ id: project[0] });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
})

app.get('/api/v1/projects', (request, response) => {
  //GET ALL PROJECTS FROM DATABASE
  database('projects').select()
    .then(projects => {
      response.status(200).json(projects);
    })
    .catch(error => {
      response.status(500).json({ error })
    });
})

app.delete('/api/v1/projects/:projectid', (request, response) => {
  //DELETE A PROJECT FROM DATABASE BASED ON ID
})

app.post('/api/v1/palettes', (request, response) => {
  //POST A PALETTE TO THE DATABASE BASED ON A PROJECT ID
})

app.get('/api/v1/palettes', (request, response) => {
  //GET ALL PALETTES BASED ON A PROJECT ID
})

app.delete('/api/v1/palettes/:paletteid', (request, response) => {
  //DELETE A PALETTE BASED ON ID AND PROJECT ID
})



app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`)
})