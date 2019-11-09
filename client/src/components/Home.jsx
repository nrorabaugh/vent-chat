import React, { Component } from 'react'
import axios from 'axios'
import Mudroom from './Mudroom'

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
        axios.get('/api/users')
        .then((res) => {
            this.setState({userRoster: res.data})
        })
        localStorage.clear()
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
                await this.toggleLogin()
                return
            }
        }
        let currentUser = {userName: this.state.currentUserHandle}
        await axios.post('/api/users', currentUser)
        .then((newUser) => {
            this.setState({currentUser: newUser.data})
        })
        await this.toggleLogin()
    }
    render() {
        return (
            <div>
                { this.state.loggedIn? <Mudroom
                currentUser = {this.state.currentUser}/> 
                :
                <div className='flex'>
                    <h1 className='title'>VentChat</h1>
                    <form className='login' onSubmit={this.login}>
                        <input type='text' name='userName' placeholder='Screen Name' onChange={this.userHandle}/>
                        <input className='submit' type='submit' value='Enter'/>
                    </form>
                    </div>
                }
            </div>
        )
    }
}
