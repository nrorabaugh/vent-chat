import React, { Component } from 'react'

export default class NewRoom extends Component {
    render() {
        return (
            <form>
                <input type='text' placeholder='Room Name'/>
                <input type='submit' value='Create Room'/>
            </form>
        )
    }
}