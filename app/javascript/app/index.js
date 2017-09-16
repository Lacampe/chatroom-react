import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app'

const node = document.querySelector('.hook')
const chatrooms = JSON.parse(node.getAttribute('chatrooms'))
const current_user = JSON.parse(node.getAttribute('current_user'))
const default_active_chatroom = JSON.parse(node.getAttribute('default_active_chatroom'))

ReactDOM.render(<App chatrooms={chatrooms} current_user={current_user} default_active_chatroom={default_active_chatroom} />, node)
