const express = require('express')
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const mongoose = require('mongoose')
const restaurant = require('./models/restaurant')
const routes = require('./routes')

const app = express()

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.use(routes)

// 新增餐廳頁面

app.listen(3000, () => {
  console.log("App is running on http://localhost:3000")
})