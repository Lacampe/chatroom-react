import React, { Component } from 'react';
import ChatroomCard from './chatroom_card';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatrooms: props.chatrooms,
      current_user: props.current_user,
      isTicked: false
    };
  }

  handleSearch(event) {
    const searchInput = event.target.value.toLowerCase();
    this.setState({ chatrooms: this.props.chatrooms }, () => {
      var filteredChatrooms = [];
      this.state.chatrooms.map((chatroom, index) => {
        if (chatroom.name.toLowerCase().startsWith(searchInput)) {
          filteredChatrooms.push(chatroom)
        }
      });
      this.setState({ chatrooms: filteredChatrooms });
    });
  }

  handleCheckbox() {
    this.setState({ isTicked: !this.state.isTicked });
    // var filteredChatrooms = [];
    // this.state.chatrooms.map((chatroom, index) => {
    //   if (chatroom.creator_id === this.state.current_user.id) {
    //     filteredChatrooms.push(chatroom)
    //   }
    // });
    // this.setState({ chatrooms: filteredChatrooms });
  }

  render() {
    console.log(this.state.chatrooms.length)

    var ticked = '';
    if (this.state.isTicked) {
      ticked = 'ticked'
    }

    return (
      <div className='app-container flex-around'>

        <div className='left'>
          <input type='text' placeholder='Find a chatroom...' className='search' onChange={this.handleSearch.bind(this)}/>
          <div className='my-chatrooms flex'>
            <div className={'checkbox ' + ticked} onClick={this.handleCheckbox.bind(this)}></div>
            <h6>My Chatrooms</h6>
          </div>
          <div className='chatrooms-list'></div>
        </div>

        <div className='center'></div>

        <div className='right'></div>

      </div>
    )
  }
}

export default App;
