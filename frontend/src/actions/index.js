export const addMessage = message => {
  return {
    type: 'ADD_MESSAGE',
    payload: message.content
  }
}
