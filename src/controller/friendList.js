const { v4: uuidv4 } = require('uuid')
const {response} = require('../helpers/response')
const createError = require('http-errors')
const { modelIdUser } = require('../models/users')
const { modelAddMessage, modelChatPrivate } = require('../models/message')
const { modelAddFriend, modelGetFriend, modelCheckFriend, modelUnfriend } = require('../models/friendList')
const moment = require('moment')

exports.getAllFriend = async (req, res, next)  => {
  try {
    const {myId} = req
    const {name} = req.query || ''
    const result = await modelGetFriend(myId, name)
    await result.map( async (value, index) => {
      const result2 = await modelChatPrivate(myId, value.friendId)
      const resData = result2.slice(result2.length - 1, result2.length)
      result[index].message = resData[0].message
      result[index].timeChat = resData[0].createdAt
      console.log('result2', resData)
    })
    console.log('tes', result)
    setTimeout(() => {
      return response(res, 200, {lastChat: null, result}, null)
    }, 1000);
  } catch (err) {
    console.log(err)
    const error = createError.InternalServerError()
    return next(error)
  }
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
            modelIdUser(friendId)
             .then( result2 => {
               console.log('ini result loro', result2)
                const id = uuidv4()
                const data = {
                  id,
                  idSender: myId,
                  idReceiver: friendId,
                  message: `Hello ${result2[0].name}, nice too meet you`, 
                  momentjsTime: moment(new Date()).format('LTS')
                }
                modelAddMessage(data)
                  .then(() => {
                    return response(res, 201, { message: 'Add friend success' }, null)
                  })
             })
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