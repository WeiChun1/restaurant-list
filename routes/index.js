const express = require('express')

const router = express.Router()

const { authenticator } = require('../middleware/auth')
const home = require('./modules/home')
const restaurant = require('./modules/restaurant')
const users = require('./modules/users')


router.use('/users', users)

router.use('/restaurants', authenticator, restaurant)

router.use('/', authenticator, home)

module.exports = router