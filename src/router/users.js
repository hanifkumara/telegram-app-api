const express = require('express')
const route = express.Router()
const { getAllUsers, listUsers } = require('../controller/users')
const {verifyToken} = require('../middleware/verifyToken')

route
  .get('/', verifyToken, getAllUsers)
  .get('/list-users', verifyToken, listUsers)

module.exports = route
