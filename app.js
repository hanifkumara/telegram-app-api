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

app.use(cors())

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const io = socket(server, {
  cors: {
    origin: '*',
  }
})

io.on('connection', (socket) => {
  console.log(`Assalamualaikum boyy ${socket.id}`)
  socket.on('salam', data => {
    console.log(data)
    socket.broadcast.emit('kirimKembali', data)
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