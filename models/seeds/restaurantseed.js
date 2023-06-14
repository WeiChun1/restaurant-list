const Restaurant = require('../restaurant')
const db = require('../../config/mongoose')

const restaurants = require('../../restaurant.json')

db.once('open', () => {
  for(let i = 0; i < restaurants.results.length; i++){
    Restaurant.create(
      restaurants.results[i]
    )
  }
})