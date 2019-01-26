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

app.delete('/api/v1/projects/:id', (request, response) => {
  //DELETE A PROJECT FROM DATABASE BASED ON ID
})

app.post('/api/v1/palettes', (request, response) => {
  const palette = request.body

  for (let requiredParameter of ['title', 'color_1', 'color_2', 'color_3', 'color_4', 'color_5', 'project_id']) {
    if (!palette[requiredParameter]) {
      return response.status(422).send({ error: `Expected format: { title: <String>, color_1: <string>, color_2: <string>, color_3: <string>, color_4: <string>, color_5: <string>, project_id: <number> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('palettes').insert(palette, 'id')
    .then(palette => {
      response.status(201).json({ id: palette[0] });
    })
    .catch(error => {
      response.status(500).json({ error });
    });

})

app.get('/api/v1/palettes', (request, response) => {
  //GET ALL PALETTES 
})

app.delete('/api/v1/projects/:id/palettes/:id', (request, response) => {
  //DELETE A PALETTE BASED ON ID AND PROJECT ID
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`)
})