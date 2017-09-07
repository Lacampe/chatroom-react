import React, { Component } from 'react';
import Message from './message';

class Chatroom extends Component {

  renderBtn() {
    if (!this.props.displayForm) {
      return (
        <div className='creation-btn flex-center' onClick={this.props.handleDisplay}>
          <h3>Create a Chatroom</h3>
        </div>
      )
    }
  }

  renderChatroomOrForm() {
    var messages = []
    this.props.messages.map((message, index) => {
      messages.push(<Message  key={message.id}
                              body={message.body}
                              sender={message.sender_id}
                              current_user={this.props.current_user} />)
    });
    if (this.props.displayForm) {
      return (
        <div className='creation-form'>
          <i className="fa fa-times back-btn" onClick={this.props.handleDisplay}></i>
          <h1 className='flex-center'>Chatroom Creation</h1>
          <div className='creation-input-container'>
            <h5>Name</h5>
            <input type='text' id='name-input'/>
          </div>
          <div className='creation-input-container'>
            <h5>Description</h5>
            <textarea type='text' id='description-input'/>
          </div>
          <div className='creation-submit-container'>
            <div className='submit-btn flex-center' onClick={this.props.handleSubmit}>
              <h3>Create</h3>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className='chatroom'>
          <div className='chatroom-top'>
          {this.props.activeChatroom[0].name}
          </div>
          <div className='chatroom-middle'>
            {messages}
          </div>
          <div className='chatroom-bottom'>
            <textarea onKeyDown={this.props.handleSend} id='message-form'/>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className='center'>
        <div className='creation-container flex-center'>
          {this.renderBtn()}
        </div>
        <div className='chatroom-container'>
          {this.renderChatroomOrForm()}
        </div>
      </div>
    )
  }
}

export default Chatroom;
