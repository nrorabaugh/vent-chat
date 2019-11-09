import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class Mudroom extends Component {
    componentDidMount() {
        localStorage.setItem('currentUser', JSON.stringify(this.props.currentUser))
    }
    render() {
        return(
            <Redirect to='/rooms'/>
        )
    }
}