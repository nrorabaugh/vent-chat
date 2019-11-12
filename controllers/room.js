const express = require('express')

const roomApi = require('../models/room.js')

const roomRouter = express.Router()

roomRouter.post('/rooms', (req, res) => {
  roomApi.addRoom(req.body)
  .then((room) => {
  res.json(room)
  })
})

roomRouter.get('/rooms/name/:name', (req,res) => {
  roomApi.getRoomByName(req.params.name)
  .then((room) => {
    res.json(room)
  })
})

roomRouter.get('/rooms', (req,res) => {
  roomApi.getRooms()
  .then((rooms) => {
    res.json(rooms)
  })
})

roomRouter.get('/rooms/:id', (req, res) => {
    roomApi.getRoom(req.params.id)
    .then((room) => {
        res.json(room)
    })
})

roomRouter.delete('/rooms/:id', (req, res) => {
    roomApi.deleteRoom(req.params.id)
    .then(() => {
        res.redirect('/rooms')
    })
})

module.exports = {
  roomRouter
}
