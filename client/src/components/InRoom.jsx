import React, { Component } from 'react'
import axios from 'axios'
import Message from './Message'

export default class InRoom extends Component {
    state= {
        data: {},
        messages: []
    }
    componentDidMount = () => {
        axios.get(`/rooms/${this.props.match.params.id}`)
        .then((response) => {
            this.setState({data: response.data})
        })
        axios.get(`/messages/room/${this.props.match.params.id}`)
        .then((response) => {
            this.setState({messages: response.data})
        })
    }
    render() {
        const messagesRender = this.state.messages.map((message, index) => {
            return <Message
            messageContent = {message.messageContent}
            creatorName = {message.creatorName}
            key = {index}
            />
        })
        return (
            <div>
                <h1>{this.state.data.name}</h1>
                <div className='board'>
                {messagesRender}
                </div>
            </div>
        )
    }
}