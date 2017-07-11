import { combineReducers } from 'redux'
import messages from './messages'

const messagesState = combineReducers({
  messages
})

export default messagesState
