import React, { Component } from 'react';

class MemberCard extends React.Component {
  render() {
    var isOnline = '';
    this.props.online === true ? isOnline = 'online' : isOnline = 'offline'
    return(
      <div className='member-card flex'>
        <div className={isOnline}></div>
        <img src='user.png' />
        <p>{'@' + this.props.username}</p>
      </div>
    )
  }
}

export default MemberCard;
