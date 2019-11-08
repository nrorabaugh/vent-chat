import React, { Component } from 'react'

export default class Mudroom extends Component {
    componentDidMount() {
        localStorage.setItem('currentUser', JSON.stringify(this.props.currentUser))
    }
    render() {
        return(
            <div>
                <p>Welcome to VentChat, where you can vent about anything you want!</p>
                <a href='/rooms'>
                    <button>Enter VentChat</button>
                </a>
            </div>
        )
    }
}