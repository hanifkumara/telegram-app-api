const connection = require('../config/database')

exports.checkEmail = (email) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM users WHERE email = '${email}'`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

exports.insertUser = (data) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO users SET ?`, data, (error, result) => {
      if (!error){
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}
exports.verifyUserModel = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE users SET confirmed = 1 WHERE id = '${id}'`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}