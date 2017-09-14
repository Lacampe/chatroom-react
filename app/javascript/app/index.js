import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app'

const node = document.querySelector('.hook')
const chatrooms = JSON.parse(node.getAttribute('chatrooms'))
const current_user = JSON.parse(node.getAttribute('current_user'))

ReactDOM.render(<App chatrooms={chatrooms} current_user={current_user} />, node)
