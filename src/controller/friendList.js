const { v4: uuidv4 } = require('uuid')
const {response} = require('../helpers/response')
const createError = require('http-errors')
const { modelAddFriend, modelGetFriend, modelCheckFriend, modelUnfriend } = require('../models/friendList')

exports.getAllFriend = (req, res, next) => {
  const {myId} = req
  const {name} = req.query || ''
  modelGetFriend(myId, name)
    .then((result) => {
      return response(res, 200, result, null)
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
}

exports.addFriend = (req, res, next) => {
  const {myId} = req
  const {friendId} = req.body
  const id = uuidv4()
  const data = {
    id,
    myId,
    friendId
  }
  modelCheckFriend({myId: myId, friendId: friendId})
    .then((result) => {
      if (result.length === 0) {
        console.log(data)
        modelAddFriend(data)
          .then(() => {
            return response(res, 201, { message: 'Add friend success' }, null)
          })
          .catch(() => {
            const error = createError.InternalServerError()
            return next(error)
          })
      } else {
        modelUnfriend({myId: data.myId, friendId: data.friendId})
          .then(() => {
            return response(res, 200, { message: 'Unfriend success' }, null)
          })
          .catch(() => {
            const error = createError.InternalServerError()
            return next(error)
          })
      }
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
}