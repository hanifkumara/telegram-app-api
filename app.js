require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const PORT = 5000
const cors = require('cors')
const morgan = require('morgan')
const socket = require('socket.io')
const router = require('./src/router/index')
const bodyParser = require('body-parser')
const { response } = require('./src/helpers/response')
const { modelAddMessage } = require('./src/models/message')
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
  console.log(`Assalamualaikum boyy ${socket.id}`)
  socket.on('afterLogin', dataUser => {
    socket.join('room :' + dataUser.room)
    socket.broadcast.to('room :' + dataUser.room).emit('sendBack', `BOT : user ${dataUser.username} join to ${dataUser.room} group`)
  })
  socket.on('message', data => {
    io.to('room :' + data.room).emit('sendBack', data.message)
  })
  
  socket.on('initialUser', (dataUser) => {
    console.log(dataUser)
    socket.join(['chat:' + dataUser.idSender + '' + dataUser.idReceiver, 'chat:' + '' + dataUser.idReceiver + dataUser.idSender])
  })
  socket.on('messagePrivate', data => {
    data.status = 'sender'
    socket.broadcast.to(`chat:${data.idSender}${data.idReceiver}`).to(`chat:${data.idReceiver}${data.idSender}`).emit('sendBack', data)
    delete data.status
    socket.emit('sendBack', data)
    const id = uuidv4()
    const dataMessage = {
      id,
      idSender: data.idReceiver,
      idReceiver: data.idSender,
      message: data.message,
      momentjsTime: moment(new Date()).format('LT'),
      createdAt: new Date()
    }
    modelAddMessage(dataMessage)
  })
  socket.on('disconnect', ()=>{
    console.log('client terputus')
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