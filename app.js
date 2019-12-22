const express = require('express')
const app = express()
const http = require('http').createServer(app)
const cors = require('cors')
const bodyParser = require('body-parser')
const io = require('socket.io')(http)

const port = process.env.PORT || 3000
const recordRoutes = require('./routes/record.routes')

app.use(cors())
app.use(bodyParser.json())
app.use('/api', recordRoutes)

http.listen(port, () => {
  console.log('Listening to post ' + port)
})

io.sockets.on('connection', socket => {
  console.log('Socket connection', socket.id)

  socket.on('disconnect', () => {
    console.log('Socket disconnect')
  })

  socket.on('get-all-records', () => {
    io.sockets.emit('get-records')
  })

  socket.on('add-record', record => {
    io.sockets.emit('get-records')
  })

  socket.on('delete-record', id => {
    io.sockets.emit('delete-record', id)
  })

  socket.on('update-record', record => {
    io.sockets.emit('update-record', record)
  })

})







