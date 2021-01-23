const { v4: uuidv4 } = require('uuid')
const {response} = require('../helpers/response')
const createError = require('http-errors')
const { modelChatPrivate} = require('../models/message')
const { modelAddFriend, modelGetFriend, modelCheckFriend, modelUnfriend } = require('../models/friendList')


exports.getAllFriend =  (req, res, next)  => {
  const {myId} = req
  const {name} = req.query || ''
  modelGetFriend(myId, name)
    .then((result) => {
      let resResult2 = []
      let resJson = []
      result.map((value) => {
        modelChatPrivate(myId, value.friendId)
          .then(result2 => {
            const resData = result2.slice(result2.length - 1, result2.length)
            resJson.push(resData[0])
          })
          .catch(err => {
            console.log(err)
          })
      })
      setTimeout(() => {
        console.log('res result2', resJson)
        return response(res, 200, {lastChat: resJson, result}, null)
      }, 200)
    })
    .catch((err) => {
      console.log(err)
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