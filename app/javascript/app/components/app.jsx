import React, { Component } from 'react';
import ChatroomCard from './chatroom_card';
import Chatroom from './chatroom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  handleDisplayForm() {
    this.setState({ displayForm: !this.state.displayForm });
  }

  handleSubmitForm() {
    this.setState({ displayForm: !this.state.displayForm });
  }

  render() {
    console.log();

    var ticked = '';
    if (this.state.isTicked) {
      ticked = 'ticked'
    }

    var chatroomsList = [];
    this.state.chatrooms.map((chatroom, index) => {
      chatroomsList.push(<ChatroomCard key={chatroom.id}/>)
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
                      displayForm={this.state.displayForm}/>}


        <div className='right'></div>

      </div>
    )
  }
}

export default App;
