import React, { Component } from 'react'
import axios from 'axios'

export default class RoomListItem extends Component {
    state = {
        messages: [],
    }
    componentDidMount() {
        axios.get(`/api/messages/room/${this.props.id}`)
        .then((response) => {
            this.setState({messages: response.data})
        })
    }

    render() {
        let link = `/rooms/${this.props.id}`
        let account = JSON.parse(localStorage.getItem('currentUser')).userName === this.props.creatorName
        return (
            <a href={link}>
            <div className='listItem'>
                    <h2>{this.props.name}</h2>
                    <div className='host'>                   
                        <p>Hosted by {account? 'you' : this.props.creatorName}</p>
                        {account? <button className='delete'>Delete Room</button> : null}
                    </div>
                    <p>{this.state.messages.length} {this.state.messages.length === 1? 'message' : 'messages'}</p>                       
            </div>
            </a>
        )
    }
}