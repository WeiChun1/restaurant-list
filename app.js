const express = require('express')
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const mongoose = require('mongoose')
const restaurant = require('./models/restaurant')
//const restaurant = require('./models/restaurant')

const app = express()

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

app.get("/search", (req, res) => {
  if (!req.query.keyword.trim()) {
    return res.redirect("/")
  }

  const keywords = req.query.keyword
  const keyword = req.query.keyword.trim().toLowerCase()

  return Restaurant.find()
    .lean()
    .then(restaurants => {
      const filterRestaurantsData = restaurants.filter(
        data =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      )
      res.render("index", { restaurants: filterRestaurantsData, keywords })
    })
    .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  return Restaurant.find()
    .lean()
    .then(restaurants => {
      const restaurant = restaurants.find(restaurant => restaurant.id.toString() === req.params.id)
      res.render('show', { restaurant })
    })
  
})

app.post('/restaurants/new', (req, res) => {

})

app.listen(3000, () => {
  console.log("App is running on http://localhost:3000")
})