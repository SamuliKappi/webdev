const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'NEW_NOTIFI':
    state = action.data
    return state
  default:
    return state
  }
}
export const changeNotifi = (content) => {
  return {
    type: 'NEW_NOTIFI',
    data: content
  }
}

export default notificationReducer