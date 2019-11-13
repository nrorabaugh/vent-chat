import React, { Component } from 'react'
import RoomListItem from './RoomListItem'
import axios from 'axios'

export default class Rooms extends Component {
    state = {
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
            creatorName={room.creatorName}
            />
        })
        return (
            <div>
                <div className='banner'>
                    <a href='/newRoom'>Create Room</a>
                    <h1>VentChat</h1>
                    <a href='/'>Log Out</a>
                </div>
                <div className='rooms'>
                    {roomsRender}
                </div>
            </div>
        )
    }
}
