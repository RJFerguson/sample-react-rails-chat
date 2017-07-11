import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//Import libraries to support Redux and the React-Redux integration
import { Provider } from 'react-redux'
import { createStore } from 'redux'
//import the combine reducer
import messagesState from './reducers'
import App from './App';
import registerServiceWorker from './registerServiceWorker';


import actionCable from 'actioncable'
const CableApp = {}
CableApp.cable = actionCable.createConsumer(`ws://${window.location.hostname}:3000/chat`)

let store = createStore(messagesState)

ReactDOM.render(
  <Provider store={store}>
    <App cableApp={CableApp}/>
  </Provider>, document.getElementById('root')
);
registerServiceWorker();
