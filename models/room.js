const mongoose = require('./connection.js')

const RoomModelSchema = new mongoose.Schema({
 name: String,
 messageCount: String,
 creatorId: String 
})

const RoomCollection = mongoose.model('Room', RoomModelSchema)

const getRooms = () => {
  return RoomCollection.find()
}

const addRoom = (data) => {
  return RoomCollection.create(data)
} 

const deleteRoom = (id) => {
  return RoomCollection.deleteOne({_id: id})
}

const getRoom = (id) => {
  return RoomCollection.findOne({_id: id})
}

module.exports = {
  getRooms,
  addRoom,
  getRoom,
  deleteRoom
}