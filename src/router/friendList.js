const express = require('express')
const route = express.Router()
const { addFriend, getAllFriend } = require('../controller/friendList')
const { verifyToken } = require('../middleware/verifyToken')

route
  .get('/', verifyToken, getAllFriend)
  .post('/', verifyToken, addFriend)

module.exports = route
