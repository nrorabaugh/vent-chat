const express = require('express')
const app = express()
const io = require('socket.io')(4000)

io.on('connection', function(socket) {
    console.log('new user')
    socket.on('send-message', message => {
        console.log(message)
        io.emit('new-message', message)
        })
})

io.on('send-message', message => {
    console.log(message)
    
})

const { messageRouter } = require('./controllers/message.js')
const { roomRouter } = require('./controllers/room.js')
const { userRouter } = require('./controllers/user.js')

app.use(express.urlencoded({extended: true}))

app.use(express.json())

app.use(express.static(`${__dirname}/client/build`))

app.use('/api', messageRouter)
app.use('/api', roomRouter)
app.use('/api', userRouter)

app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
})
