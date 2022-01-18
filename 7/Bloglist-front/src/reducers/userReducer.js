const userReducer = (state = {}, action) => {
  switch (action.type) {
  case 'LOG_IN':
    state = action.data
    return state
  default:
    return state
  }
}
export const login = (user) => {
  return {
    type: 'LOG_IN',
    data: user
  }
}
export default userReducer