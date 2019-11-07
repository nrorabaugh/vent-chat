import React, { Component } from 'react'

export default class RoomListItem extends Component {
    render() {
        return (
            <div>
                    <h2>{this.props.name}</h2>
                    <p>{this.props.messageCount} messages</p>
            </div>
        )
    }
}