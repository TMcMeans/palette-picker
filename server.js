const express = require('express')
const app = express()

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Palette Picker'

app.use(express.static('public'))


//consider an array with letters and numbers and run an iterator to separately add hex code values 


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`)
})