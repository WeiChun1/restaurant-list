const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const FacebookStrategy = require('passport-facebook').Strategy

module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStrategy(
    { 
      usernameField: 'email' ,
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, email, password, cb) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))
        }
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
          if (!isMatch) {
            return cb(null, false, { message: 'Email or Password incorrect.' })
          }
          return cb(null, user)
        })
      })
      .catch(err => cb(err, false))
  }))

  // 設定序列化與反序列化
  passport.serializeUser((user, cb) => {
    cb(null, user.id)
  })
  passport.deserializeUser((id, cb) => {
    User.findById(id)
      .lean()
      .then(user => cb(null, user))
      .catch(err => cb(err, null))
  })
}

