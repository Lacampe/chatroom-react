import React from 'react';
import ReactDOM from 'react-dom';
import Chatroom from './components/chatroom';

const node = document.querySelector('.chatroom-container');
const chatroom = JSON.parse(node.getAttribute('chatroom'))
const currentUser = JSON.parse(node.getAttribute('current_user'))

ReactDOM.render(<Chatroom chatroom={chatroom} currentUser={currentUser} />, node)
