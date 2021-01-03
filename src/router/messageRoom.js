const express = require('express')
const { verifyToken } = require('../middleware/verifyToken')
const route = express.Router()
const { addMessageRoom, getChatRoom, getGroupChat, getDetailGroup } = require('../controller/messageRoom')

route
  .get('/chat-room', verifyToken, getChatRoom)
  .get('/group-chat', verifyToken, getGroupChat)
  .get('/detail-group', verifyToken, getDetailGroup)
  .post('/', verifyToken, addMessageRoom)

module.exports = route
