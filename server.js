const express = require('express')
const app = express()


const { messageRouter } = require('./controllers/message.js')
const { roomRouter } = require('./controllers/room.js')
const { userRouter } = require('./controllers/user.js')

app.use(express.urlencoded({extended: true}))

app.use(express.json())

app.use(express.static(`${__dirname}/client/build`))

app.use('/', messageRouter)
app.use('/', roomRouter)
app.use('/', userRouter)

app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
})
