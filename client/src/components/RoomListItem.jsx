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
        return (
            <div className='listItem'>
                <a href={link}>
                    <h2>{this.props.name}</h2>
                    <p>{this.state.messages.length} {this.state.messages.length == 1? 'message' : 'messages'}</p>
                </a>
            </div>
        )
    }
}