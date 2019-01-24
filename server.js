// const environment = process.env.NODE_ENV || 'development';
// const configuration = require('./knexfile')[enviornment];
// const database = require('knex')(configuration);

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Palette Picker'

app.use(express.static('public'))
app.use(bodyParser.json())

app.post('/api/v1/projects', (request, response) => {
  //POST A PROJECT TO DATABASE
})

app.get('/api/v1/projects', (request, response) => {
  //GET ALL PROJECTS FROM DATABASE
})

app.delete('/api/v1/projects/:projectid', (request, response) => {
  //DELETE A PROJECT FROM DATABASE BASED ON ID
})

app.post('/api/v1/projects/:projectid/palettes', (request, response) => {
  //POST A PALETTE TO THE DATABASE BASED ON A PROJECT ID
})

app.get('/api/v1/projects/:projectid/palettes', (request, response) => {
  //GET ALL PALETTES BASED ON A PROJECT ID
})

app.delete('/api/v1/projects/:projectid/palettes/:paletteid', (request, response) => {
  //DELETE A PALETTE BASED ON ID AND PROJECT ID
})



app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`)
})