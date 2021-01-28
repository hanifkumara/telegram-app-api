const { response } = require('../helpers/response')
const { modelAddMessageRoom, modelChatRoom, modelGroupChat, modelDetailGroup, modelAddRoom, modelAddMember, modelDeleteMember, modelDeleteRoom, modelCheckMember } = require('../models/messageRoom')
const { v4: uuidv4 } = require('uuid')
const createError = require('http-errors')

exports.getDetailGroup = (req, res, next) => {
  const idRoom = req.query.idRoom
  modelDetailGroup(idRoom)
    .then(result => {
      return response(res, 201, result, null)
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
}
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

exports.addRoom = (req, res, next) => {
  const {myId} = req
  const {name} = req.body
  const idRoom = uuidv4()
  const idMember = uuidv4()
  data = {
    id: idRoom,
    name,
    photo: 'https://placekitten.com/310/310'
  }
  modelAddRoom(data)
    .then((result) => {
      modelAddMember({ id: idMember, idRoom: idRoom, idUser: myId})
       .then(() => {
        return response(res, 200, {message: 'Create Group success'}, null)
       })
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
}

exports.addMember = (req, res, next) => {
  const {idRoom, idUser} = req.body
  const id = uuidv4()
  modelCheckMember(idRoom, idUser)
    .then(result => {
      if (result.length > 0) return response(res, 401, null, { message: 'User already join' })
        modelAddMember({ id, idRoom, idUser })
        .then(() => {
          return response(res, 200, {message: 'Add member success'}, null)
        })
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
}

exports.deleteMember = (req, res, next) => {
  const {idRoom, idUser} = req.query
  modelDeleteMember({ idRoom, idUser })
    .then(() => {
      return response(res, 200, { message: 'Delete member success' }, null)
    })
    .catch((err) => {
      const error = createError.InternalServerError()
      return next(error)
    });
}

exports.deleteRoom = (req, res, next) => {
  const {id} = req.params
  modelDeleteRoom(id)
    .then((result) => {
      if (result.affectedRows === 0) {
        return response(res, 401, null, { message: 'id not found' })
      }
      return response(res, 200, { message: 'Delete group chat success' }, null)
    })
    .catch((err) => {
      const error = createError.InternalServerError()
      return next(error)
    });
}