require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const PORT =  process.env.PORT || 5000
const cors = require('cors')
const morgan = require('morgan')
const socket = require('socket.io')
const router = require('./src/router/index')
const bodyParser = require('body-parser')
const { response } = require('./src/helpers/response')
const { modelAddMessage } = require('./src/models/message')
const { modelUpdateProfile } = require('./src/models/users')
const { modelAddMessageRoom } = require('./src/models/messageRoom')
const { v4: uuidv4 } = require('uuid')
const moment = require('moment')

app.use(cors())

// app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const io = socket(server, {
  cors: {
    origin: '*',
  }
})
io.on('connection', (socket) => {
  const myId = {}
  console.log('user connect', socket.id)
  // socket.on('afterLogin', dataUser => {
  //   socket.join('room :' + dataUser.room)
  //   socket.broadcast.to('room :' + dataUser.room).emit('sendBack', `BOT : user ${dataUser.username} join to ${dataUser.room} group`)
  // })
  // socket.on('message', data => {
  //   io.to('room :' + data.room).emit('sendBack', data.message)
  // })
  socket.on('handleStatus', data => {
    myId.id = data
    console.log('pas konek', myId.id)
    modelUpdateProfile(data, {socketId: 'Online'})
  })
  socket.on('initialUser', (dataUser) => {
    socket.join('Chat:'+dataUser.idSender)
  })
  socket.on('messagePrivate', data => {
    data.status = 'sender'
    data.notif = 'toasted'
    socket.broadcast.to('Chat:'+data.idReceiver).emit('sendBack', data)
    delete data.status
    delete data.notif
    socket.emit('sendBack', data)
    const id = uuidv4()
    const dataMessage = {
      id,
      idSender: data.idSender,
      idReceiver: data.idReceiver,
      message: data.message,
      momentjsTime: moment(new Date()).format('LT'),
      createdAt: new Date()
    }
    modelAddMessage(dataMessage)
  })
  socket.on('initialRoom', dataRoom => {
    socket.join('Room:' + dataRoom)
  })
  socket.on('messageRoom', dataRoom => {
    dataRoom.notif = 'toasted'
    console.log('ini data room', dataRoom)
    socket.broadcast.to('Room:' + dataRoom.idRoom).emit('sendBackRoom', dataRoom)
    delete dataRoom.notif
    const id = uuidv4()
    const data = {
      id,
      idRoom: dataRoom.idRoom,
      idUser: dataRoom.idUser,
      message: dataRoom.message,
      createdAt: new Date()
    }
    modelAddMessageRoom(data)
    socket.emit('sendBackRoom', dataRoom)
  })
  socket.on('logout', userId => {
    socket.disconnect()
  })
  socket.on('disconnect', ()=>{
    console.log('user with id '+myId.id+' disconnect')
    modelUpdateProfile(myId.id, { socketId: 'Offline' })
    console.log(`client ${socket.id} disconnect`)
  })
})

app.use('/api/v1', router)
app.use('/upload', express.static('./image'))

app.get('/', (req, res) => {
  res.json({
    'name': 'Hanif Kumara',
    'email': 'hanifkumara@gmail.com'
  })
})

app.use('*', (req, res, next) => {
  const error = new Error('URL Not Found')
  error.status = 400
  return next(error)
})

app.use((err, req, res, next) => {
  response(res, err.status = 500, null, { message: err.message })
})

server.listen(PORT, ()=>{
  console.log(`Server is running port ${PORT}`)
})