const messages = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return [
        ...state,
        {
          content: action.payload
        }
      ]
    //If no case matches you must always return the passed in state vai a default case
    default:
      return state
  }
}

export default messages
