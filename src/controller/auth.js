const bcrypt = require('bcryptjs')
const { response } = require('../helpers/response')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const { checkEmail, insertUser } = require('../models/auth')
const { modelUpdateProfile } = require('../models/users')
const moment = require('moment')
const createError = require('http-errors')
const { sendEmail, emailForgotPassword } = require('../helpers/email')

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

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body
    const resEmail = await checkEmail(email)
    console.log('cek email', resEmail)
    if (resEmail.length < 1) {
      return response(res, 401, null, { message: 'Email not found' })
    } else {
      console.log('ini idnya', resEmail[0].id)
      jwt.sign({ myId: resEmail[0].id }, process.env.SECRET_KEY, { expiresIn: '1d' }, (err, emailToken) => {
        const url = `${process.env.BASE_URL_FRONTEND}/auth/create-password/${emailToken}`;
        emailForgotPassword(email, url)
        return response(res, 201, { token: emailToken, message: 'Send email success. Pelase check your email now' }, null)
      })
    }
  } catch (err) {
    const error = createError.InternalServerError()
    return next(error)
  }
}

exports.resetPassword = (req, res, next) => {
  try {
    const { password } = req.body
    console.log(password)
    const authorization = req.headers.authorization
    if (!authorization) return response(res, 201, null, {message: 'You not have token!!'})
    let token = authorization.split(' ')
    token = token[1]
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        if (err.name === 'JsonWebTokenError') {
          return response(res, 201, null, { message: 'Invalid Token!!' })
        } else if (err.name === 'TokenExpiredError') {
          return response(res, 201, null, {message: 'Token expired'})
        }
      }
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          modelUpdateProfile(decoded.myId, {password: hash})
            .then(() => {
              console.log(decoded)
              return response(res, 201, { message: 'Reset password success!!' }, null)
            })
        })
      })
      console.log(decoded)
    })
  } catch (error) {
    return response(res, 201, null, { message: 'Something went wrong!!' })
  }
}