import React, { Component } from 'react';
import Message from './message';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';

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

    var tooltipMessage = '';
    this.props.activeChatroom[3].id === this.props.current_user.id ? tooltipMessage = 'Destroy chatroom 💥' : tooltipMessage = 'Unsubscribe from chatroom 💥'

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
          <div className='chatroom-top flex-between'>
            <div className='chatroom-info flex-column'>
              <h1>{this.props.activeChatroom[0].name}</h1>
              <h3>{this.props.activeChatroom[0].description}</h3>
            </div>
            <Tooltip
                position='top'
                html={(
                  <div style={{ 'color': 'white',
                                'backgroundColor': 'rgba(0, 0, 0, 0.7)',
                                'marginBottom': '5px',
                                'padding': '5px 10px',
                                'borderRadius': '5px' }}>
                    <p>{tooltipMessage}</p>
                  </div>
                )}
                trigger='mouseenter' >
              <p>X</p>
            </Tooltip>
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
