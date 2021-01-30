const connection = require('../config/database')

exports.modelAllRoom = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM rooms', (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}
exports.modelAddMessageRoom = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO message_room SET ?', data, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}
exports.modelChatRoom = (idRoom) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT message_room.*, rooms.name as nameRoom, users.name as nameMember FROM message_room INNER JOIN rooms ON message_room.idRoom = rooms.id INNER JOIN users ON message_room.idUser = users.id WHERE rooms.id = '${idRoom}' ORDER BY message_room.createdAt ASC`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}
exports.modelGroupChat = (myId) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT member.*, rooms.name as nameRoom, rooms.photo as photoRoom, users.name as nameMember FROM member INNER JOIN rooms ON member.idRoom = rooms.id INNER JOIN users ON member.idUser = users.id WHERE member.idUser = '${myId}'`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}
exports.modelDetailGroup = (idRoom) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT member.*, rooms.name as nameRoom, rooms.photo as photoRoom, users.name as nameMember, users.photo as photoMember, users.phoneNumber as phoneMember FROM member INNER JOIN rooms ON member.idRoom = rooms.id INNER JOIN users ON member.idUser = users.id WHERE member.idRoom = '${idRoom}'`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}
exports.modelAddRoom = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO rooms SET ?', data, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}
exports.modelAddMember = data => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO member SET ?', data, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}
exports.modelDeleteMember = (data) => {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM member WHERE idRoom = '${data.idRoom}' AND idUser = '${data.idUser}'`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}
exports.modelDeleteRoom = (id) => {
  return new Promise((resolve, reject) => {
    console.log(id)
    connection.query(`DELETE FROM rooms WHERE id = '${id}'`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}
exports.modelCheckMember = (idRoom, idUser) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM member WHERE idRoom = '${idRoom}' AND idUser = '${idUser}'`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}