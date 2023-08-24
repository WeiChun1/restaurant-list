const express = require('express')

const router = express.Router()

const Restaurant = require('../../models/restaurant')
//新增餐廳
router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('/', (req, res) => {
  const userId = req.user._id
  const restaurantInfo = req.body
  return Restaurant.create({ ...restaurantInfo, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
//查詢功能
router.get("/search", (req, res) => {
  if (!req.query.keyword.trim()) {
    return res.redirect("/")
  }
  const userId = req.user._id
  const keywords = req.query.keyword
  const keyword = req.query.keyword.trim().toLowerCase()
  return Restaurant.find({ userId })
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
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => {res.render('show', { restaurant })})
    .catch(error => console.log(error))
})
//編輯餐廳資料
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
  const modifyData = req.body
  const id = req.params.id
  return Restaurant.findByIdAndUpdate(id, modifyData)
      .then(() => res.redirect(`/restaurants/${id}`))
})
//刪除資料
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router