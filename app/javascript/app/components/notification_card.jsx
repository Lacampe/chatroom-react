import React, { Component } from 'react';

class NotificationCard extends React.Component {
  render() {
    return(
      <div className='notification flex-start'>
        <p><b>@{this.props.notifier.username}</b> mentionned you in <b>{this.props.chatroom.name}</b></p>
      </div>
    )
  }
}

export default NotificationCard;
