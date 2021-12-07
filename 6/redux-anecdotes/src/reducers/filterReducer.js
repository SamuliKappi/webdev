export const change = (text) => {
  return {
    type: 'CHANGE',
    text: text
  }
}

const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE':
      return action.text
    default:
      return state
  }
}

export default filterReducer