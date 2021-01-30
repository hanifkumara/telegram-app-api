const connection = require('../config/database')
const fs = require('fs')

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
exports.modelIdUser = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM users WHERE id = '${id}'`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}
exports.modelMyProfile = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM users WHERE id = '${id}'`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}
exports.modelUpdateProfile = (id, data) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE users SET ? WHERE id = ?',[data, id], (error, result) => {
      if(!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}
exports.deletePhoto = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT photo FROM users WHERE id = ?`, id, (error, result) => {
      if (!error) {
        if (result[0].photo !== 'https://placekitten.com/500/500') {
          const image = result[0].photo.split('/')[4]
          console.log('ini image', image)
          const path = `./image/${image}`
          fs.unlink(path, (err) => {
            if (err) {
              resolve(err)
            } else {
              resolve({ message: 'Success delete image' })
            }
          })
        }
      } else {
        reject(error)
      }
    })
  })
}