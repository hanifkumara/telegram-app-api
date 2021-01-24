const bcrypt = require('bcryptjs')
const { response } = require('../helpers/response')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const { checkEmail, insertUser } = require('../models/auth')
const moment = require('moment')
const createError = require('http-errors')
const { sendEmail } = require('../helpers/email')

exports.login = (req, res, next) => {
  const {email, password} = req.body
  checkEmail(email)
    .then((result) => {
      if (result.length > 0) {
        const user = result[0]
        if (user.confirmed !== 1) return response(res, 401, null, { message: "you haven't done ameil verification" })
        bcrypt.compare(password, user.password, function (err, resCheck) {
          if (!resCheck) return response(res, 401, null, { message: 'Password Wrong!!' })
          delete user.password

          const payload = {
            userId: user.id,
            email: user.email,
          }
          jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '5h' }, function (err, token) {
            user.token = token
            return response(res, 200, user, null)
          })

        })
      } else {
        return response(res, 401, null, { message: 'Email Unlisted!!' })
      }
    })
    .catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })
  
}

exports.register = (req, res, next) => {
  const id = uuidv4()
  const { name, email, password } = req.body
  checkEmail(email)
    .then((result) => {
      if (result.length > 0) return response(res, 401, null, {message: 'Email Already exist!!'})
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          moment.locale(id)
          const data = {
            id,
            name,
            email,
            password: hash,
            photo: 'https://placekitten.com/500/500',
            createdAt: moment(new Date()).format('LLL')
          }
          jwt.sign({user: data.id}, process.env.SECRET_KEY, {expiresIn: '5h'}, function (err, token) {
            const url = `${process.env.BASE_URL_FRONTEND}/confirmation-email/${token}`
            sendEmail(email, url)
              .then(res => {
                console.log(res)
              })
              .catch(err => {
                console.log(err)
              })
          })
          insertUser(data)
            .then(() => {
              return response(res, 201, {message: 'Register success!!'}, null)
            })
        })
      })
    }).catch(() => {
      const error = createError.InternalServerError()
      return next(error)
    })

}