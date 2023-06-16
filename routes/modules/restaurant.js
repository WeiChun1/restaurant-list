const express = require('express')

const router = express.Router()

const Restaurant = require('../../models/restaurant')
//查詢功能

//新增餐廳
router.get('/new', (req, res) => {
  return res.render('new')
})

router.get("/search", (req, res) => {
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
//看餐廳詳細資料
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => {res.render('show', { restaurant })})
    .catch(error => console.log(error))
})



module.exports = router