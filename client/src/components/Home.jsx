import React, { Component } from 'react'
import axios from 'axios'
import Rooms from './Rooms'

export default class Home extends Component {
    state = {
        userRoster: [],
        currentUserHandle: '',
        currentUser: {
            userName: ''
        },
        loggedIn: false
    }
    componentDidMount() {
        axios.get('/users')
        .then((res) => {
            this.setState({userRoster: res.data})
        })
    }
    userHandle = (evt) => {
        const currentUserHandle = evt.target.value
        this.setState({currentUserHandle})
    }
    toggleLogin = () => {
        let loggedIn = !this.state.loggedIn
        this.setState({loggedIn})
    }
    login = async (event) => {
        event.preventDefault()
        for(let i=0; i<this.state.userRoster.length; i++) {
            if(this.state.currentUserHandle === this.state.userRoster[i].userName) {
                this.setState({currentUser: this.state.userRoster[i]})
                return
            }
        }
        let currentUser = {userName: this.state.currentUserHandle}
        this.setState({currentUser})
        await axios.post('/users', currentUser)
    }
    render() {
        return (
            <div>
                { this.state.loggedIn? <Rooms
                currentUser = {this.state.currentUser}/> 
                :
                <div>
                    <h1>VentChat</h1>
                    <form onSubmit={this.login}>
                        <input type='text' name='userName' placeholder='Screen Name' onChange={this.userHandle}/>
                        <input type='submit' value='Enter'/>
                    </form>
                </div>
                }
            </div>
        )
    }
}
