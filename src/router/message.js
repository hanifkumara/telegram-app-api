const express = require('express')
const { verifyToken } = require('../middleware/verifyToken')
const route = express.Router()
const { addMessage, getChatPrivate} = require('../controller/message')

route
  .post('/chat-private', verifyToken, getChatPrivate)
  .post('/', verifyToken, addMessage)

module.exports = route
