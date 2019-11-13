import React, { Component } from 'react'
import axios from 'axios'

export default class RoomListItem extends Component {
    state = {
        messages: [],
    }
    componentDidMount = () => {
        axios.get(`/api/messages/room/${this.props.id}`)
        .then((response) => {
            this.setState({messages: response.data})
        })
    }

    deleteRoom = () => {
        axios.delete(`/api/rooms/${this.props.id}`)
    }

    render() {
        let link = `/rooms/${this.props.id}`
        let account = JSON.parse(localStorage.getItem('currentUser')).userName === this.props.creatorName
        return (
            
            <div className='listItem'>
                <div>
                <a href={link}>
                    <div className='content'>
                    <h2>{this.props.name}</h2>                   
                    <p>Hosted by {account? 'you' : this.props.creatorName}</p>
                    <p>{this.state.messages.length} {this.state.messages.length === 1? 'message' : 'messages'}</p> 
                    </div>             
                </a>    
                <button onClick={this.deleteRoom}>Delete</button>
                </div>     
            </div>
           
        )
    }
}