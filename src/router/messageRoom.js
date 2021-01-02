const express = require('express')
const { verifyToken } = require('../middleware/verifyToken')
const route = express.Router()
const { addMessageRoom, getChatRoom, getGroupChat } = require('../controller/messageRoom')

route
  .get('/chat-room', verifyToken, getChatRoom)
  .get('/group-chat', verifyToken, getGroupChat)
  .post('/', verifyToken, addMessageRoom)

module.exports = route
