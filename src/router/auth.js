const express = require('express')
const route = express.Router()
const {login} = require('../controller/auth')
const {register} = require('../controller/auth')

route
  .post('/login', login)
  .post('/register', register)

module.exports = route
