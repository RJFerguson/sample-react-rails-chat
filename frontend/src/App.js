import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class PizzaRoom extends Component {
  constructor(props) {
    super(props)
    this.state = {messages:[]}
    this.handleSendMessage = this.handleSendMessage.bind(this)
  }

  componentDidMount() {
    this.props.cableApp.messagesPizza = this.props.cableApp.cable.subscriptions.create({channel: "MessagesChannel", room: "Pizzas" },
      {
        received: (message) => this.setState({ messages: [message, ...this.state.messages,] })
      })
  }

  handleSendMessage(e) {
    e.preventDefault()
    const message = document.getElementById('pizza-input').value
    console.log(message)
    this.props.cableApp.messagesPizza.send({content: message})
    document.getElementById('pizza-input').value = ''
  }

  displayMessages() {
    const messages = this.state.messages.map( message => <li  key={message.content}>{message.content}</li> )
    return (
      <ul>
        {messages}
      </ul>
    )
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSendMessage}>
          <input id="pizza-input" type="text" />
          <input type="submit" value="Send pizza msg" />
        </form>

        <div id="pizza-messages">
          {this.displayMessages()}
        </div>
      </div>
    )
  }
}


class TacoRoom extends Component {
  constructor(props) {
    super(props)
    this.state = {messages:[]}
    this.handleSendMessage = this.handleSendMessage.bind(this)
  }

  componentDidMount() {
    this.props.cableApp.messagesTaco = this.props.cableApp.cable.subscriptions.create({channel: "MessagesChannel", room: "Tacos" },
      {
        received: (message) => this.setState({ messages: [message, ...this.state.messages,] })
      })
  }

  handleSendMessage(e) {
    e.preventDefault()
    const message = document.getElementById('taco-input').value
    console.log(message)
    this.props.cableApp.messagesTaco.send({content: message})
    document.getElementById('taco-input').value = ''
  }

  displayMessages() {
    const messages = this.state.messages.map( message => <li key={message.content}>{message.content}</li> )
    return (
      <ul>
        {messages}
      </ul>
    )
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSendMessage}>
          <input id="taco-input" type="text" />
          <input type="submit" value="Send taco msg" />
        </form>

        <div id="taco-messages">
          {this.displayMessages()}
        </div>
      </div>
    )
  }
}


class App extends Component {

  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div className="App">
        <TacoRoom cableApp={this.props.cableApp} />
        <PizzaRoom cableApp={this.props.cableApp} />
      </div>
    );
  }
}

export default App;
