import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {messages:[]}
    this.handleSendMessage = this.handleSendMessage.bind(this)
  }

  componentDidMount() {
    this.props.cableApp.messages = this.props.cableApp.cable.subscriptions.create({channel: "MessagesChannel", room: "One" },
      {
        received: (message) => this.setState({ messages: [message, ...this.state.messages,] })
      })
  }

  handleSendMessage(e) {
    e.preventDefault()
    const message = document.getElementById('input').value
    console.log(message)
    this.props.cableApp.messages.send({content: message})
  }

  displayMessages() {
    const messages = this.state.messages.map( message => <li>{message.content}</li> )
    return (
      <ul>
        {messages}
      </ul>
    )
  }
  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSendMessage}>
          <input id="input" type="text" />
          <input type="submit" value="Send message" />
        </form>

        <div>
          {this.displayMessages()}
        </div>
      </div>
    );
  }
}

export default App;
