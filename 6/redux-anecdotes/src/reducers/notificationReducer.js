const initialState = {
  status: 'none',
  text: ''
}
var timerid
export const changeNotification = (text, time) => {
  return async dispatch => {
    dispatch({
      type: 'ALERT',
      data: text,
      display: ''
    })
    clearTimeout(timerid)
    timerid = setTimeout(() => {
      dispatch({
        type: 'ALERT',
        data: '',
        display: 'none'
      })
    }, time*1000)
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ALERT':
      const newStuff = {status: action.display, text: action.data}
      return newStuff
    default:
      break;
  }
  return state
}
export default notificationReducer