import React, { Component } from 'react';
import ChatroomCard from './chatroom_card';
import Chatroom from './chatroom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeChatroom: props.chatrooms[0],
      chatrooms: props.chatrooms,
      current_user: props.current_user,
      displayForm: false,
      isTicked: false,
    };
  }

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
          this.setState({ activeChatroom: data });
        })
      document.getElementById('message-form').value = '';
    }
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
    var chatroomsList = [];
    this.state.chatrooms.map((chatroom, index) => {
      chatroomsList.push(<ChatroomCard key={chatroom[0].id} name={chatroom[0].name} />)
    });
    return (
      <div className='app-container flex-around'>

        <div className='left'>
          <input type='text' placeholder='Find a chatroom...' className='search' onChange={this.handleSearch.bind(this)}/>
          <div className='my-chatrooms flex'>
            <div className={'checkbox ' + ticked} onClick={this.handleCheckbox.bind(this)}></div>
            <h6>My Chatrooms</h6>
          </div>
          <div className='chatrooms-list flex-center'>{chatroomsList}</div>
        </div>
        {<Chatroom  handleDisplay={this.handleDisplayForm.bind(this)}
                    handleSubmit={this.handleSubmitForm.bind(this)}
                    handleSend={this.handleSendMessage.bind(this)}
                    activeChatroom={this.state.activeChatroom}
                    displayForm={this.state.displayForm}
                    messages={this.state.activeChatroom[1]}
                    current_user={this.state.current_user} />}
        <div className='right'></div>

      </div>
    )
  }
}

export default App;
