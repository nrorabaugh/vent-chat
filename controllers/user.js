const express = require('express')

const userApi = require('../models/user.js')

const userRouter = express.Router()

userRouter.post('/users', (req, res) => {
    userApi.addUser(req.body)
  .then((user) => {
  res.json(user)
  })
})

userRouter.get('/users/name/:name', (req, res) =>{
  userApi.getUserByName(req.params.name)
  .then((user) => {
    res.json(user)
  })
})

userRouter.get('/users', (req,res) => {
    userApi.getUsers()
  .then((users) => {
    res.json(users)
  })
})

userRouter.get('/users/:id', (req, res) => {
    userApi.getUser(req.params.id)
    .then((user) => {
        res.json(user)
    })
})

userRouter.delete('/users/:id', (req, res) => {
    userApi.deleteUser(req.params.id)
    .then(() => {
        res.redirect('/users')
    })
})

module.exports = {
  userRouter
}
