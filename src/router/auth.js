const express = require('express')
const route = express.Router()
const { login, register, forgotPassword, resetPassword } = require('../controller/auth')
const { verifyUserModel } = require('../models/auth')
const { response } = require('../helpers/response')
const jwt = require('jsonwebtoken')

route
  .post('/login', login)
  .post('/register', register)
  .get('/confirmation/:token', async (req, res) => {
    try {
      const result = jwt.verify(req.params.token, process.env.SECRET_KEY)
      const id = result.user
      await verifyUserModel(id)
    } catch (error) {
      return response(res, 401, null, { message: 'Something went wrong' })
    }
    return response(res, 200, { message: 'Verification email success' }, null)
  })
  .post('/forgot-password', forgotPassword)
  .patch('/reset-password', resetPassword)

module.exports = route
