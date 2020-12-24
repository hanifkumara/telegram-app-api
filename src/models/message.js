const connection = require('../config/database')

exports.modelAddMessage = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO message SET ?', data, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

exports.modelChatPrivate = (idSender, idReceiver) => {
  return new Promise((resolve, reject) => {
    console.log('id pengirim', idSender)
    console.log('id penerima', idReceiver)
    connection.query(`SELECT message.*, sender_name.name as senderMessage, receiver_name.name as receiverMessage FROM message INNER JOIN users sender_name ON message.idSender = sender_name.id INNER JOIN users receiver_name ON message.idReceiver = receiver_name.id WHERE sender_name.id = '${idSender}' AND receiver_name.id = '${idReceiver}' OR sender_name.id = '${idReceiver}' AND receiver_name.id = '${idSender}' ORDER BY message.createdAt DESC`, (error, result) => {
      if(!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}