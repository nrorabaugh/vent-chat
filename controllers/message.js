const express = require('express')

const messageApi = require('../models/message.js')

const messageRouter = express.Router()

messageRouter.post('/messages', (req, res) => {
  messageApi.addMessage(req.body)
  .then((message) => {
  res.json(message)
  })
})

messageRouter.get('/messages/room/:roomId', (req,res) => {
  messageApi.getMessagesInRoom(req.params.roomId)
  .then((messages) => {
    res.json(messages)
  })
})

messageRouter.get('/messages', (req, res) => {
  messageApi.getMessages()
  .then((messages) => {
    res.json(messages)
  })
})

messageRouter.get('/messages/:id', (req, res) => {
  messageApi.getAMessage(req.params.id)
  .then((message) => {
    res.json(message)
  })
})

messageRouter.delete('/messages/:id', (req, res) => {
  messageApi.deleteMessage(req.params.id)
  .then(() => {
    res.redirect('/messages')
  })
})

module.exports = {
  messageRouter
}
