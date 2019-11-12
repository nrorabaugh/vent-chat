const mongoose = require('./connection.js')

const UserModelSchema = new mongoose.Schema({
 userName: String,
 current: false
})

const UserCollection = mongoose.model('User', UserModelSchema)

const getUsers = () => {
  return UserCollection.find()
}

const addUser = (data) => {
  return UserCollection.create(data)
} 

const deleteUser = (id) => {
  return UserCollection.deleteOne({_id: id})
}

const getUser = (id) => {
  return UserCollection.findOne({_id: id})
}

const getUserByName = (name) => {
  return UserCollection.findOne({userName: name})
}

module.exports = {
  getUsers,
  addUser,
  deleteUser,
  getUser,
  getUserByName
}