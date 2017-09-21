import React, { Component } from 'react';
import ActionCable from 'actioncable';
import ChatroomCard from './chatroom_card';
import Chatroom from './chatroom';
import MemberCard from './member_card';

// chatroom[0] = chatroom
// chatroom[1] = chatroom messages
// chatroom[2] = chatroom members
// chatroom[3] = chatroom creator

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      online_users: [],
      activeChatroom: props.default_active_chatroom,
      activeChatroomMessages: props.default_active_chatroom[1],
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
          this.setState({ activeChatroom: data, activeChatroomMessages: data[1] })
      });
      document.title = chatroom[0].name + ' 💬'
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

  // Destroy chatroom if creator; Unsubscribe from chatroom if member
  handleDestroyOrUnsubscribe(chatroom) {
    if (this.state.current_user.id === chatroom[3].id) {
      const body = {};
      body[Rails.csrfParam()] = Rails.csrfToken()
      fetch('chatrooms/' + chatroom[0].id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(body)
      })
        .then(response => response.json())
        .then((data) => {
          this.setState({ activeChatroom: data, activeChatroomMessages: data[1] })
          document.title = this.state.activeChatroom[0].name + ' 💬'
        })
    } else {
      const body = { chatroom_id: chatroom[0].id }
      body[Rails.csrfParam()] = Rails.csrfToken()
      fetch('chatroom_subscriptions/unsubscribe', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(body)
      })
        .then(response => response.json())
        .then((data) => {
          this.setState({ activeChatroom: data, activeChatroomMessages: data[1] })
          document.title = this.state.activeChatroom[0].name + ' 💬'
        })
    }
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
      // this.setState({ chatrooms: data });
      this.setState({ activeChatroom: data, activeChatroomMessages: data[1] });
      document.title = this.state.activeChatroom[0].name + ' 💬'
    })
  }

  handleSendMessage(event) {
    if (document.getElementById('message-form').value !== '') {
      if ((event.keyCode === 13) || (event.type === 'click')) {
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
    document.title = this.state.activeChatroom[0].name + ' 💬'
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

    // Member cards list build
    var onlineMembersList = [];
    var offlineMembersList = [];
    var onlineUsersIds = [];
    this.state.online_users.map((user, index) => {
      onlineUsersIds.push(user.id)
    })
    setTimeout(
      this.state.activeChatroom[2].map((member, index) => {
        if (onlineUsersIds.includes(member.id)) {
          onlineMembersList.push(<MemberCard key={member.id} username={member.username} online={true} />)
        } else {
          offlineMembersList.push(<MemberCard key={member.id} username={member.username} online={false} />)
        }
      }
    ), 1000)

    window.onload = () => {
      document.title = this.state.activeChatroom[0].name + ' 💬'

      const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
      // Messages channel
      cable.subscriptions.create('MessagesChannel', {
        connected: () => {
          console.log('Connected to MessagesChannel')
        },
        received: (data) => {
          const activeChatroomMessages = this.state.activeChatroomMessages;
          if (this.state.activeChatroom[0].id == data.chatroom_id) {
            this.setState({ activeChatroomMessages: activeChatroomMessages.concat(data) })
            document.querySelector('.chatroom-middle').lastChild.scrollIntoView(true)
          }
        }
      });
      // Chatroom subscriptions channel
      cable.subscriptions.create('ChatroomSubscriptionsChannel', {
        connected: () => {
          console.log('Connected to ChatroomSubscriptionsChannel')
        },
        received: (data) => {
          this.setState({ chatrooms: data[0], activeChatroom: data[1] });
        }
      });
      // Chatrooms channel
      cable.subscriptions.create('ChatroomsChannel', {
        connected: () => {
          console.log('Connected to ChatroomsChannel')
        },
        received: (data) => {
          this.setState({ chatrooms: data })
        }
      });
      // Users channel
      cable.subscriptions.create('UsersChannel', {
        connected: () => {
          console.log('Connected to UsersChannel')
          const data = {
            user_id: this.state.current_user.id
          }
          const body = { user: data }
          body[Rails.csrfParam()] = Rails.csrfToken()
          fetch('go_online', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify(body)
          })
        },
        received: (data) => {
          this.setState({ online_users: data })
        }
      });
      // Scroll down to last message
      document.querySelector('.chatroom-middle').lastChild.scrollIntoView(true);
    }

    window.onbeforeunload = () => {
      const data = {
        user_id: this.state.current_user.id
      }
      const body = { user: data }
      body[Rails.csrfParam()] = Rails.csrfToken()
      fetch('go_offline', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(body)
      })
    }

    // this.state.activeChatroomMessages.forEach((message) => {
    //   console.log(message.body.includes('@' + this.state.current_user.username.toLowerCase()))
    // });

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
                    handleDestroyOrUnsubscribe={this.handleDestroyOrUnsubscribe.bind(this, this.state.activeChatroom)}
                    activeChatroom={this.state.activeChatroom}
                    displayForm={this.state.displayForm}
                    messages={this.state.activeChatroomMessages}
                    current_user={this.state.current_user} />}
        {/* Right container */}
        <div className='right'>
          <div className='top'>

          </div>
          <div className='flex members-header'>
            <i className="fa fa-users" aria-hidden="true"></i>
            <h3>Members</h3>
          </div>
          <div className='members-container'>
            {onlineMembersList}
            {offlineMembersList}
          </div>
        </div>

      </div>
    )
  }
}

export default App;
