const express = require('express')
const app = express()
const socket = require('socket.io')

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

const server = (app.listen(PORT, () => {
            console.log(`App is listening on PORT ${PORT}`)
        }))

const io = socket(server)

io.on('connection', function(socket) {
    socket.on('send-message', (message) => {
        console.log('new message' )
        io.emit('new-message', message)
        })
    }
)

// io.configure(function () { 
//     io.set("transports", ["xhr-polling"]); 
//     io.set("polling duration", 10); 
//     }
// )
