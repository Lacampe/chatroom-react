import React, { Component } from 'react';

class Chatroom extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  renderFormOrBtn() {
    if (this.props.displayForm) {
      console.log('display')
    } else {
      return (
        <div className='creation-btn flex-center' onClick={this.props.handleForm}>
          <h3>Create a Chatroom</h3>
        </div>
      )
    }
  }

  render() {
    return (
      <div className='creation-container flex-center'>
        {this.renderFormOrBtn()}
      </div>
    )
  }
}

export default Chatroom;
