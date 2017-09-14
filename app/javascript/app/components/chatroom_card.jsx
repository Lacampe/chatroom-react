import React, { Component } from 'react';

class ChatroomCard extends React.Component {
  active() {
    if (this.props.chatroom[0].id === this.props.activeChatroom[0].id) {
      return (
        <p className='active'>active</p>
      )
    }
  }

  memberOrJoin() {
    var membersIds = [];
    this.props.chatroom[2].map((member, index) => {
      membersIds.push(member.id)
    })
    if (membersIds.includes(this.props.current_user.id)) {
      return (
        <div className='member-badge flex-center'>
          <i className="fa fa-check" aria-hidden="true"></i>
          <p>member</p>
        </div>
      )
    } else {
      return (
        <div className='join-badge flex-center' onClick={this.props.handleJoinChatroom}>
          <i className="fa fa-plus" aria-hidden="true"></i>
          <p>join</p>
        </div>
      )
    }
  }

  unreadMessages() {

  }

  render() {
    var membersIds = [];
    this.props.chatroom[2].map((member, index) => {
      membersIds.push(member.id)
    })
    var notAMember = '';
    if (!membersIds.includes(this.props.current_user.id)) {
      notAMember = 'not-a-member'
    }

    var membersCount = '';
    this.props.chatroom[2].length > 1 ? membersCount = ' members' : membersCount = ' member'

    return (
      <div className={'chatroom-card ' + notAMember} onClick={this.props.handleCardClick}>
        {/* Badges */}
        <div className='top flex-end'>
          {this.active()}
          {this.unreadMessages()}
          {this.memberOrJoin()}
        </div>
        {/* Name */}
        <div className='name'>
          <h3>{this.props.chatroom[0].name}</h3>
        </div>
        {/* Description */}
        <div className='description'>
          <h5>{this.props.chatroom[0].description}</h5>
        </div>
        {/* Creator & members */}
        <div className='bottom flex-between'>
          <div className='creator'>
            <p>created by <b><em>@{this.props.chatroom[3].username}</em></b></p>
          </div>
          <div className='members-count flex-center'>
            <i className="fa fa-users" aria-hidden="true"></i>
            <h6>{this.props.chatroom[2].length + membersCount}</h6>
          </div>
        </div>
      </div>
    )
  }
}

export default ChatroomCard;
