const userListReducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_TO_LIST':
    state = state.concat(action.data)
    return state
  default:
    return state
  }
}
export const addToList = (user) => {
  return {
    type: 'ADD_TO_LIST',
    data: user
  }
}
export default userListReducer