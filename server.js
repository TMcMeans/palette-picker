const express = require('express')
const app = express()

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Palette Picker'

app.use(express.static('public'))


app.post('/api/v1/new-project', (request, response) => {
  //send new project names to database as records on the projects table
})

app.post('/api/v1/new-palette', (request, response) => {
  //send new palette and 5 hexcode values to database with a foreign key that corresponds to the project name
})

app.get('/api/v1/projects', (request, response) => {
  //grab ALL of the users project records from the database and all of the palettes that correspond with each database to display on the DOM
})


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`)
})