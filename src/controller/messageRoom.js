const { response } = require('../helpers/response')
const { modelAddMessageRoom, modelChatRoom, modelGroupChat } = require('../models/messageRoom')
const { v4: uuidv4 } = require('uuid')
const createError = require('http-errors')


exports.getGroupChat = (req, res, next) => {
  const {myId} = req
  modelGroupChat(myId)
    .then(result => {
      return response(res, 201, result, null)
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
}
exports.addMessageRoom = (req, res, next) => {
  const { myId } = req
  const { message, idRoom } = req.body
  const id = uuidv4()
  const data = {
    id,
    idRoom,
    idUser: myId,
    message,
    createdAt: new Date()
  }
  modelAddMessageRoom(data)
    .then(result => {
      return response(res, 201, { message: 'Send chat success' }, null)
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
}

exports.getChatRoom = (req, res, next) => {
  const { idRoom } = req.query
  modelChatRoom(idRoom)
    .then((result) => {
      return response(res, 200, result, null)
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
}