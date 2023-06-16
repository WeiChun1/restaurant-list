const express = require('express')
const exphbs = require('express-handlebars')
const bodyPqrser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

const app = express()

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyPqrser.urlencoded({ extended: true }))

app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(routes)



app.listen(3000, () => {
  console.log("App is running on http://localhost:3000")
})