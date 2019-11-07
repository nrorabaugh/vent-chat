import React from 'react'

export default class Message extends React.Component {
    render() {
        return (
            <div className='message'>
                <h5 className='messageText'>{this.props.creatorName}: {this.props.messageContent}</h5>
            </div>
        )
    }
}