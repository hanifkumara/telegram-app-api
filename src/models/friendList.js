const connection = require('../config/database')


exports.modelGetFriend = (id, name) => {
  return new Promise((resolve, reject) => {
    if (id, name) {
      connection.query(`SELECT friend_list.*, my.name as myName, friend.name as friendName, friend.photo as friendPhoto FROM friend_list INNER JOIN users my ON friend_list.myId = my.id INNER JOIN users friend ON friend_list.friendId = friend.id WHERE my.id = '${id}' AND friend.name LIKE '%${name}%'`, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    } else {
      connection.query(`SELECT friend_list.*, my.name as myName, friend.name as friendName, friend.photo as friendPhoto FROM friend_list INNER JOIN users my ON friend_list.myId = my.id INNER JOIN users friend ON friend_list.friendId = friend.id WHERE my.id = '${id}'`, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    }
  })
}
exports.modelAddFriend = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO friend_list SET ?', data, (error, result) => {
      if(!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}
exports.modelCheckFriend = (data) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM friend_list WHERE myId = '${data.myId}' AND friendId = '${data.friendId}'`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}
exports.modelUnfriend = (data) => {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM friend_list WHERE myId = '${data.myId}' AND friendId = '${data.friendId}'`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}