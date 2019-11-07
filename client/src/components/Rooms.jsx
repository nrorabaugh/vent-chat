import React, { Component } from 'react'
import RoomListItem from './RoomListItem'
import axios from 'axios'

export default class Rooms extends Component {
    state = {
        currentUser: {}
    }

    roomsGather() {
        return axios.get('/rooms')
    }
    
    render() {
        const roomsArray = this.roomsGather()
        const roomsRender = roomsArray.map((room, index) => {
            return <RoomListItem
            name={room.name}
            messageCount={room.messageCount}
            />
        })
        return (
            <div>
                <h1>VentChat</h1>
                {roomsRender}
            </div>
        )
    }
}
