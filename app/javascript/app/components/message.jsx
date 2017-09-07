import React, { Component } from 'react';

class Message extends React.Component {

  render() {
    var sender = '';
    (this.props.sender == this.props.current_user.id) ? sender = 'flex-end' : sender = 'flex-start'
    return(
      <div className={sender}>
        <p>{this.props.body}</p>
      </div>
    )
  }
}

export default Message;
