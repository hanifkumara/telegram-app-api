const express = require('express')
const route = express.Router()
const { getAllUsers, listUsers, updateProfile } = require('../controller/users')
const {verifyToken} = require('../middleware/verifyToken')
const { uploadMulter } = require('../middleware/upload')

route
  .get('/', verifyToken, getAllUsers)
  .get('/list-users', verifyToken, listUsers)
  .patch('/', verifyToken, uploadMulter.single('photo'), updateProfile)

module.exports = route
