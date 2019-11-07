import React, { Component } from 'react'
import axios from 'axios'

export default class InRoom extends Component {
    state= {
        data: {},
        messages: []
    }
    componentDidMount = () => {
        axios.get(`/rooms/${this.props.match.params.id}`)
        .then((response) => {
            this.setState({data: response.data})
        })
    }
    render() {
        return (
            <h1>{this.state.data.name}</h1>
        )
    }
}