const mongoose = require('./connection.js')

const MessageModelSchema = new mongoose.Schema({
 messageContent: String,
 roomId: String,
 creatorName: String 
})

const MessageCollection = mongoose.model('Message', MessageModelSchema)

const getMessagesInRoom = (roomId) => {
  return MessageCollection.find({roomId: roomId})
}

const deleteMessage = (id) => {
  return MessageCollection.deleteOne({_id: id})
}

const getMessages = () => {
  return MessageCollection.find()
}

const getAMessage = (id) => {
  return MessageCollection.findOne({_id: id})
}

const addMessage = (data) => {
  return MessageCollection.create(data)
} 

module.exports = {
  getMessagesInRoom,
  addMessage,
  deleteMessage,
  getAMessage,
  getMessages
}
