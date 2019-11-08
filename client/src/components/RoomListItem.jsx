import React, { Component } from 'react'

export default class RoomListItem extends Component {
    render() {
        let link = `/rooms/${this.props.id}`
        return (
            <div>
                <a href={link}>
                    <h2>{this.props.name}</h2>
                    <p>{this.props.messageCount} messages</p>
                </a>
            </div>
        )
    }
}