import React, { Component } from 'react'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class NewRoom extends Component {
    state = {
        redirect: false,
    }

    postNewRoom = (evt) => {
        evt.preventDefault()
        let currentUser = JSON.parse(localStorage.getItem('currentUser'))
        let newRoom = {
            name: evt.target.name.value,
            creatorName: currentUser.userName
        }
        Axios.post('/api/rooms', newRoom)
        .then(() => {
            this.setState({redirect: true})
        })
    }
    render() {
        return (
            <div>
                {this.state.redirect? <Redirect to='/rooms'/> :
                <form onSubmit={this.postNewRoom}>
                    <input type='text' name='name' placeholder='Room Name'/>
                    <input type='submit' value='Create Room'/>
                </form>
                }
            </div>
        )
    }
}