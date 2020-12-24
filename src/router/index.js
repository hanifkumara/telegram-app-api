const express = require('express')
const route = express.Router()
const routeAuth = require('./auth')
const routeUsers = require('./users')
const routeMessage = require('./message')

route
  .use('/auth', routeAuth)
  .use('/users', routeUsers)
  .use('/message', routeMessage)

module.exports = route
