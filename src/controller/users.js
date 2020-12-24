const { response } = require('../helpers/response')
const createError = require('http-errors')
const { modelAllUsers, modelListUsers} = require('../models/users')

exports.getAllUsers = (req, res, next) => {
  modelAllUsers()
    .then((result) => {
      return response(res, 200, result, null)
    }).catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    });
}

exports.listUsers = (req, res, next) => {
  const {myId} = req
  const {name} = req.query
  modelListUsers(myId, name)
    .then((result) => {
      return response(res, 200, result, null)
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
}