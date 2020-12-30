const { response } = require('../helpers/response')
const { modelAddMessage, modelChatPrivate } = require('../models/message')
const { v4: uuidv4 } = require('uuid')
const moment = require('moment')
const createError = require('http-errors')

exports.addMessage = (req, res, next) => {
  const {myId} = req
  const {message, idReceiver} = req.body
  const id = uuidv4()
  const data = {
    id,
    idSender: myId,
    idReceiver,
    message, 
    momentjsTime: moment(new Date()).format('LTS')
  }
  modelAddMessage(data)
    .then(result => {
      return response(res, 201, {message: 'Send chat success'}, null)
    })
    .catch(() =>{
      const error = createError.InternalServerError()
      return next(error)
    })
}

exports.getChatPrivate = (req, res, next) => {
  const {myId} = req
  const {idReceiver} = req.body
  modelChatPrivate(myId, idReceiver)
    .then((result) => {
      return response(res, 200, result, null)
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
}