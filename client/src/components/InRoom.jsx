import React, { Component } from 'react'
import axios from 'axios'
import Message from './Message'
import openSocket from 'socket.io-client'

let socket = openSocket()

let socketSendChat = (value) => {
    socket.emit('send-message', value)
}

export default class InRoom extends Component {
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
        socket.on('new-message', (event) => {
            console.log('sent message')
            if (this.props.match.params.id !== event.data.roomId) {
                return
            }
            const previousState = {...this.state}
            previousState.messages.push(event.data)
            this.setState(previousState)
        })
    }

    componentDidUpdate = () => {
        let board = document.getElementsByClassName('board')[0]
        board.scrollTo(0, board.scrollHeight)
    }

    sendMessage = (evt) => {
        evt.preventDefault()
        let currentUser = JSON.parse(localStorage.getItem('currentUser'))
        let message = {
            messageContent: evt.target.messageContent.value,
            roomId: this.state.data._id,
            creatorName: currentUser.userName
        }
        axios.post('/api/messages', message)
        .then((message) => {
            socketSendChat(message)
        })
    }
    render() {
        
        let messagesRender = this.state.messages.map((message, index) => {
            return <Message
            messageContent = {message.messageContent}
            creatorName = {message.creatorName}
            key = {index}
            />
        })
        return (
            <div className='roomWall'>
                <div className='banner'>
                    <span><a href='/newRoom'>Create Room</a><a href='/rooms'>Lobby</a></span>
                    <h1>{this.state.data.name}</h1>
                    <a href='/'>Log Out</a>
                </div>
                <div className='board'>
                    <div className='messageWrapper'>
                        {messagesRender}
                    </div>
                </div>
                <form onSubmit={this.sendMessage}>
                    <input type='text' name='messageContent' autoComplete='off' placeholder='Send A Message!'/>
                    <input type='submit' value='Send'/>
                </form>
            </div>
        )
    }
}

