const express = require('express')
const exphbs = require('express-handlebars')
const restaurants = require('./restaurant.json')

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurants.results })
})

app.get("/search", (req, res) => {
  if (!req.query.keyword.trim()) {
    return res.redirect("/")
  }

  const keywords = req.query.keyword
  const keyword = req.query.keyword.trim().toLowerCase()

  const filterRestaurantsData = restaurants.results.filter(
    data =>
      data.name.toLowerCase().includes(keyword) ||
      data.category.includes(keyword)
  )

  res.render("index", { restaurants: filterRestaurantsData, keywords })
})
app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurants.results.find(restaurant => restaurant.id.toString() === req.params.id)
  res.render('show', { restaurant })
})

app.listen(3000,() => {
  console.log("App is running on http://localhost:3000")
})