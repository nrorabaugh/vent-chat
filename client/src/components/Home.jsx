import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

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
                localStorage.setItem('currentUser', JSON.stringify(this.state.userRoster[i]))
                return this.toggleLogin()
            }
        }
        let currentUser = {userName: this.state.currentUserHandle}
        axios.post('/api/users', currentUser)
        axios.get(`/api/users/name/${this.state.currentUserHandle}`)
        .then((newUser) => {
        this.setState({currentUser: newUser.data})
        localStorage.setItem('currentUser', JSON.stringify(this.state.currentUser))
        this.toggleLogin()
        })
    }
    render = () => {
        return (
            <div>
                { this.state.loggedIn? <Redirect to='/rooms'/> 
                :
                <div className='flex'>
                    <h1 className='title'>VentChat</h1>
                    <form className='login' onSubmit={this.login}>
                        <input type='text' name='userName' autoComplete='off' placeholder='Screen Name' onChange={this.userHandle}/>
                        <input className='submit' type='submit' value='Enter'/>
                    </form>
                    </div>
                }
            </div>
        )
    }
}
