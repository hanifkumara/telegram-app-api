const express = require('express')
const { verifyToken } = require('../middleware/verifyToken')
const route = express.Router()
const { addMessageRoom, getChatRoom, getGroupChat, getDetailGroup, addRoom, addMember, deleteMember } = require('../controller/messageRoom')

route
  .get('/chat-room', verifyToken, getChatRoom)
  .get('/group-chat', verifyToken, getGroupChat)
  .get('/detail-group', verifyToken, getDetailGroup)
  .post('/add-room', verifyToken, addRoom)
  .post('/add-member', verifyToken, addMember)
  .post('/', verifyToken, addMessageRoom)
  .delete('/', verifyToken, deleteMember)

module.exports = route
