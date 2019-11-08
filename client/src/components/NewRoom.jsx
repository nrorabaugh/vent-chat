import React, { Component } from 'react'
import Axios from 'axios'

export default class NewRoom extends Component {
    postNewRoom = (evt) => {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'))
        let newRoom = {
            name: evt.target.name.value,
            creatorId: currentUser._id
        }
        Axios.post('/rooms', newRoom)
        .then((res) => {
            res.redirect(`/rooms/${res._id}`)
        })
    }
    render() {
        return (
            <form onSubmit={this.postNewRoom}>
                <input type='text' name='name' placeholder='Room Name'/>
                <input type='submit' value='Create Room'/>
            </form>
        )
    }
}