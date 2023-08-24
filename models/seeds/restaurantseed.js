const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')
const restaurants = require('../../restaurant.json')
const Restaurant = require('../restaurant')
const User = require('../user')
const SEED_USERS = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678'
  }
]
db.once('open', () => {
  return SEED_USERS.map((SEED_USER, userIndex) => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER.password, salt))
      .then(hash => User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash
      }))
      .then(user => {
        const userId = user.id
        return Promise.all(Array.from(
          { length: 3 },
          (_, i) => {
            i += userIndex * 3
            const result = restaurants.results[i]
            return Restaurant.create({
              ...result,
              userId
            })
          }
        ))
      })
      .then(() => {
        console.log('done.')
        process.exit()
      })
  })
})
