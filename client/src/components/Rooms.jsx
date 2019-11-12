import React, { Component } from 'react'
import RoomListItem from './RoomListItem'
import axios from 'axios'

export default class Rooms extends Component {
    state = {
        currentUser: {},
        roomList: []
    }

    componentDidMount = () => {
        axios.get('/api/rooms')
        .then((response) => {
            this.setState({roomList: response.data})
        })
    }
    
    render() {
        const roomsRender = this.state.roomList.map((room, index) => {
            return <RoomListItem
            id={room._id}
            key={index}
            name={room.name}
            messageCount={room.messageCount}
            />
        })
        return (
            <div>
                <div className='banner'>
                    <a href='/'>Log Out</a>
                    <h1>VentChat</h1>
                    <a href='/newRoom'>Create Room</a>
                </div>
                {roomsRender}
                <a href='/newRoom'><button>Create New Room</button></a>
            </div>
        )
    }
}
