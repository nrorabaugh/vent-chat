import React, { Component } from 'react'
import axios from 'axios'
import Message from './Message'
import openSocket from 'socket.io-client'



export default class InRoom extends Component {
    socket = openSocket('http://localhost:4000/')
    state= {
        data: {},
        messages: []
    }
    componentDidMount = () => {
        axios.get(`/api/rooms/${this.props.match.params.id}`)
        .then((response) => {
            this.setState({data: response.data})
        })
        axios.get(`/api/messages/room/${this.props.match.params.id}`)
        .then((response) => {
            this.setState({messages: response.data})
        })
    }

    sendMessage = (evt) => {
        evt.preventDefault()
        let currentUser = JSON.parse(localStorage.getItem('currentUser'))
        let message = {
            messageContent: evt.target.messageContent.value,
            roomId: this.state.data._id,
            creatorName: currentUser.userName
        }
        console.log(currentUser)
        console.log(evt.target.messageContent.value)
        axios.post('/api/messages', message)
        .then((message) => {
            this.socket.emit('send-message', message)
        })
    }
    render() {
        this.socket.on('new-message', () => {
            axios.get(`/messages/room/${this.state.data._id}`)
            .then((messages) => {
                this.setState({messages})
            })
        })
        const messagesRender = this.state.messages.map((message, index) => {
            return <Message
            messageContent = {message.messageContent}
            creatorName = {message.creatorName}
            key = {index}
            />
        })
        return (
            <div className='roomWall'>
                <h1 className='banner'>{this.state.data.name}</h1>
                <div className='board'>
                    <div className='messageWrapper'>
                        {messagesRender}
                    </div>
                </div>
                <form onSubmit={this.sendMessage}>
                    <input type='text' name='messageContent' placeholder='Send A Message!'/>
                    <input type='submit' value='Send'/>
                </form>
            </div>
        )
    }
}

