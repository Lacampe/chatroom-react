import React, { Component } from 'react';

class Chatroom extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

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
    if (this.props.displayForm) {
      return (
        <div className='creation-form'>
          <i className="fa fa-times back-btn" onClick={this.props.handleDisplay}></i>
          <h1 className='flex-center'>Chatroom Creation</h1>
          <div className='creation-input-container'>
            <h5>Name</h5>
            <input type='text'/>
          </div>
          <div className='creation-input-container'>
            <h5>Description</h5>
            <textarea type='text'/>
          </div>
          <div className='creation-submit-container'>
            <div className='submit-btn flex-center'>
              <h3>Create</h3>
            </div>
          </div>
        </div>
      )
    } else {

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
