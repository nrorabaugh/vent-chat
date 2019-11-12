import React, { Component } from 'react'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class NewRoom extends Component {
    state = {
        url: '',
    }

    postNewRoom = (evt) => {
        evt.preventDefault()
        let currentUser = JSON.parse(localStorage.getItem('currentUser'))
        let newRoom = {
            name: evt.target.name.value,
            creatorName: currentUser.userName
        }
        Axios.post('/api/rooms', newRoom)
        Axios.get(`/api/rooms/name/${newRoom.name}`)
        .then((room) => {
            this.setState({url: room.data._id})
        })
    }
    render() {
        let roomlink = `/rooms/${this.state.url}`
        return (
            <div className='flex'>
                {this.state.url? <Redirect to={roomlink}/> :
                <div>
                    <h1 className='title'>New VentRoom</h1>
                    <form className='login' onSubmit={this.postNewRoom}>
                        <input type='text' name='name' placeholder='Room Name'/>
                        <input type='submit' value='Create Room'/>
                    </form>
                </div>
                }
            </div>
        )
    }
}