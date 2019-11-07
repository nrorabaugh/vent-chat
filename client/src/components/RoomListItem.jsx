import React, { Component } from 'react'

export default class RoomListItem extends Component {
    render() {
        return (
            <div>
                <h4>{this.props.name}</h4>
                <p>{this.props.messageCount} messages</p>
            </div>
        )
    }
}