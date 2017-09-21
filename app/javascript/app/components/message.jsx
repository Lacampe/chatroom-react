import React, { Component } from 'react';

class Message extends React.Component {
  isDateNew() {
    var messageDate = new Date(this.props.message.created_at)
    if (this.props.previousMessage === undefined) {
      return (
        <div className='flex-between'>
          <div className='chatroom-line'></div>
          <p className='chatroom-date'>{messageDate.toLocaleDateString()}</p>
          <div className='chatroom-line'></div>
        </div>
      )
    } else {
      var previousMessageDate = new Date(this.props.previousMessage.created_at)
      if (previousMessageDate.toLocaleDateString() < messageDate.toLocaleDateString()) {
        return (
          <div className='flex-between'>
            <div className='chatroom-line'></div>
            <p className='chatroom-date'>{messageDate.toLocaleDateString()}</p>
            <div className='chatroom-line'></div>
          </div>
        )
      }
    }
  }

  render() {
    var sender = '';
    (this.props.sender === this.props.current_user.id) ? sender = 'flex-end' : sender = 'flex-start'
    var color = '';
    (this.props.sender === this.props.current_user.id) ? color = 'self' : color = 'others'

    var messageTime = new Date(this.props.message.created_at)

    return (
      <div>
        {this.isDateNew()}
        <div className={sender}>
          <div className='bubble' id={color}>
            <div className='bubble-info flex-between'>
              <div className='flex'>
                <img src='user.png' />
                <h5>@{this.props.message.username.toLowerCase()}</h5>
              </div>
              <h6 className='chatroom-time'>{messageTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</h6>
            </div>
            <div className='flex-wrap' style={{'wordBreak': 'break-all'}}>
              <p>{this.props.body}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Message;
