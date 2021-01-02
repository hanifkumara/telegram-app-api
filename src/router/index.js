const express = require('express')
const route = express.Router()
const routeAuth = require('./auth')
const routeUsers = require('./users')
const routeMessage = require('./message')
const routeFriend = require('./friendList.js')
const routeMessageRoom = require('./messageRoom')

route
  .use('/auth', routeAuth)
  .use('/users', routeUsers)
  .use('/message', routeMessage)
  .use('/message-room', routeMessageRoom)
  .use('/friend-list', routeFriend)

module.exports = route
