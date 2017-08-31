import React, { Component } from 'react';

class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatroomName: this.props.chatroom.name,
      chatroomNameEditable: false
    };
  }

  handleEdit(e) {
    e.preventDefault();
    this.setState({chatroomNameEditable: true})
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({chatroomName: e.target.value})
  }

  handleSave() {
    fetch('/chatrooms/' + this.props.chatroom.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: this.state.chatroomName})
    })
      .then(response => response.json())
      .then((data) => {
        this.setState({chatroomNameEditable: false})
      });
  }

  renderPlainOrEditName() {
    if (this.state.chatroomNameEditable) {
      return (
        <div>
          <form>
            <input value={this.state.chatroomName} onChange={this.handleChange.bind(this)}/>
          </form>
          <button onClick={this.handleSave.bind(this)}>Save</button>
        </div>
      )
    } else {
      return (
        <div>
          <h1>{this.state.chatroomName}</h1>
          <button onClick={this.handleEdit.bind(this)}>Edit</button>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderPlainOrEditName()}
      </div>
    );
  }
}

export default Chatroom;
