const connection = require('../config/database')

exports.modelAllUsers = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM users ORDER BY createdAt DESC`, (error, result) => {
      if(!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

exports.modelListUsers = (id, name) => {
  return new Promise((resolve, reject) => {
    if (id, name) {
      connection.query(`SELECT * FROM users WHERE NOT id = '${id}' AND name LIKE '%${name}%'`, (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    } else {
      connection.query(`SELECT * FROM users WHERE NOT id = '${id}'`, (error, result) => {
        if(!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    }
  })
}