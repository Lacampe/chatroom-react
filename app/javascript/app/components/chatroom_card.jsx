import React, { Component } from 'react';

class ChatroomCard extends React.Component {

  render() {
    return (
      <div className='chatroom-card'>
        <p>{this.props.name}</p>
      </div>
    )
  }
}

export default ChatroomCard;
