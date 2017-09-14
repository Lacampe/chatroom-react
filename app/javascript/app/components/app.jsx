import React, { Component } from 'react';
import ActionCable from 'actioncable';
import ChatroomCard from './chatroom_card';
import Chatroom from './chatroom';

// chatroom[0] = chatroom
// chatroom[1] = chatroom messages
// chatroom[2] = chatroom members
// chatroom[3] = chatroom creator

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeChatroom: props.chatrooms[0],
      activeChatroomMessages: props.chatrooms[0][1],
      chatrooms: props.chatrooms,
      current_user: props.current_user,
      displayForm: false,
      isTicked: false,
    };
  }

  // Search on chatrooms name
  handleSearch(event) {
    const searchInput = event.target.value.toLowerCase();
    this.setState({ chatrooms: this.props.chatrooms }, () => {
      var filteredChatrooms = [];
      this.state.chatrooms.map((chatroom, index) => {
        if (chatroom[0].name.toLowerCase().startsWith(searchInput)) {
          filteredChatrooms.push(chatroom)
        }
      });
      this.setState({ chatrooms: filteredChatrooms });
    });
  }

  // Click on card in list and make chatroom active (if current_user is a member)
  handleCardClick(chatroom) {
    var membersIds = [];
    chatroom[2].map((member, index) => {
      membersIds.push(member.id)
    });
    if (membersIds.includes(this.state.current_user.id)) {
      fetch('chatrooms/' + chatroom[0].id, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'same-origin'
      })
        .then(response => response.json())
        .then((data) => {
          this.setState({ activeChatroom: data[0], activeChatroomMessages: data[1] })
      });
    }
  }

  // Filter down chatrooms cards list to the ones where current_user is a member
  handleCheckbox() {
    this.setState({ isTicked: !this.state.isTicked }, () => {
      if (this.state.isTicked) {
        var filteredChatrooms = [];
        this.state.chatrooms.map((chatroom, index) => {
          if (chatroom[0].creator_id === this.state.current_user.id) {
            filteredChatrooms.push(chatroom)
          }
        });
        this.setState({ chatrooms: filteredChatrooms });
      } else {
        this.setState({ chatrooms: this.props.chatrooms });
      }
    });

  }

  handleDisplayForm() {
    this.setState({ displayForm: !this.state.displayForm });
  }

  // Join a chatroom (create subscription)
  handleJoinChatroom(chatroom) {
    const data = {
      user_id: this.state.current_user.id,
      chatroom_id: chatroom[0].id
    }
    const body = { chatroom_subscription: data }
    body[Rails.csrfParam()] = Rails.csrfToken()
    fetch('chatrooms/' + chatroom[0].id + '/chatroom_subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then((data) => {
      this.setState({ chatrooms: data });
      this.setState({ activeChatroom: chatroom });
    })
  }

  handleSendMessage(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      const message = document.getElementById('message-form').value;
      const data = {
        body: message
      }
      const body = { message: data }
      body[Rails.csrfParam()] = Rails.csrfToken()
      fetch('chatrooms/' + this.state.activeChatroom[0].id + '/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(body)
      })
        .then(response => response.json())
        .then((data) => {
          // this.setState({ activeChatroom: data });
        })
      document.getElementById('message-form').value = '';
    }
  }

  // Sign out
  handleSignOut() {
    fetch('/users/sign_out', {
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': Rails.csrfToken()
      },
      credentials: 'same-origin'
    })
    window.location.reload();
  }

  handleSubmitForm() {
    const name = document.getElementById('name-input').value;
    const description = document.getElementById('description-input').value;
    const data = {
      name: name,
      description: description
    }
    const body = { chatroom: data }
    body[Rails.csrfParam()] = Rails.csrfToken()
    fetch('/chatrooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then((data) => {
        this.setState({ activeChatroom: data[data.length - 1] });
        this.setState({ chatrooms: data });
      });
    this.setState({ displayForm: !this.state.displayForm });
  }

  render() {
    var ticked = '';
    if (this.state.isTicked) {
      ticked = 'ticked'
    }

    // Chatrooms cards list build
    var chatroomsList = [];
    this.state.chatrooms.map((chatroom, index) => {
      chatroomsList.push(<ChatroomCard  key={chatroom[0].id}
                                        chatroom={chatroom}
                                        activeChatroom={this.state.activeChatroom}
                                        current_user={this.state.current_user}
                                        handleCardClick={this.handleCardClick.bind(this, chatroom)}
                                        handleJoinChatroom={this.handleJoinChatroom.bind(this, chatroom)} />)
    });

    window.onload = () => {
      const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
      cable.subscriptions.create('MessagesChannel', {
        connected: () => {
          console.log('Connected to MessagesChannel')
        },
        received: (data) => {
          const activeChatroomMessages = this.state.activeChatroomMessages;
          if (this.state.activeChatroom[0].id == data.chatroom_id) {
            this.setState({ activeChatroomMessages: activeChatroomMessages.concat(data) })
          }
        }
      });
    }

    return (
      <div className='app-container flex'>
        {/* Left container */}
        <div className='left'>
          {/* Top */}
          <div className='top'>
            {/* Sign out */}
            <i className='fa fa-power-off' onClick={this.handleSignOut}></i>
          </div>
          {/* Bottom */}
          <div className='bottom'>
            {/* Search */}
            <input type='text' placeholder='Find a chatroom...' className='search' onChange={this.handleSearch.bind(this)}/>
            {/* 'My chatrooms' filter */}
            <div className='my-chatrooms flex'>
              <div className={'checkbox ' + ticked} onClick={this.handleCheckbox.bind(this)}></div>
              <h6>My Chatrooms</h6>
            </div>
            {/* Chatrooms cards list */}
            <div className='chatrooms-list'>{chatroomsList}</div>
          </div>
        </div>
        {/* Middle container */}
        {<Chatroom  handleDisplay={this.handleDisplayForm.bind(this)}
                    handleSubmit={this.handleSubmitForm.bind(this)}
                    handleSend={this.handleSendMessage.bind(this)}
                    activeChatroom={this.state.activeChatroom}
                    displayForm={this.state.displayForm}
                    messages={this.state.activeChatroomMessages}
                    current_user={this.state.current_user} />}
        {/* Right container */}
        <div className='right'></div>

      </div>
    )
  }
}

export default App;
