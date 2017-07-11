import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import { addMessage } from './actions'

class PizzaRoom extends Component {
  constructor({ dispatch }) {
    super()
    this.state = {messageDraft:''}
    this.dispatch = dispatch
    this.handleSendMessage = this.handleSendMessage.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
  }

  componentDidMount() {
    this.props.cableApp.messagesPizza = this.props.cableApp.cable.subscriptions.create({channel: "MessagesChannel", room: "Pizzas" },
      {
        received: (message) => {
          this.dispatch(addMessage(message))
        }
      })
  }

  handleSendMessage(e) {
    e.preventDefault()
    this.props.cableApp.messagesPizza.send({content: this.state.messageDraft})
    this.setState({messageDraft:''})
  }

  handleFormChange(e) {
    this.setState({messageDraft:e.target.value})
  }

  displayMessages() {
    const messages = this.props.messages.map( message => <li  key={message.content}>{message.content}</li> )
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
          <input id="pizza-input" type="text" onChange={this.handleFormChange} value={this.state.messageDraft}/>
          <input type="submit" value="Send pizza msg" />
        </form>

        <div id="pizza-messages">
          {this.displayMessages()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

let ReduxedPizzaRoom = connect(mapStateToProps)(PizzaRoom)


class TacoRoom extends Component {
  constructor(props) {
    super(props)
    this.state = {messages:[],messageDraft:''}
    this.handleSendMessage = this.handleSendMessage.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
  }

  componentDidMount() {
    this.props.cableApp.messagesTaco = this.props.cableApp.cable.subscriptions.create({channel: "MessagesChannel", room: "Tacos" },
      {
        received: (message) => this.setState({ messages: [message, ...this.state.messages] })
      })
  }

  handleSendMessage(e) {
    e.preventDefault()
    this.props.cableApp.messagesTaco.send({content: this.state.messageDraft})
    this.setState({messageDraft:''})
  }

  handleFormChange(e) {
    this.setState({messageDraft:e.target.value})
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
          <input id="taco-input" type="text" onChange={this.handleFormChange} value={this.state.messageDraft} />
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
        <ReduxedPizzaRoom cableApp={this.props.cableApp} />
      </div>
    );
  }
}

export default App;
