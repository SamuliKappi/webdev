const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}
let newstate = {}
const counterReducer = (state = initialState, action) => {
  console.log(action)
  
  switch (action.type) {
    case 'GOOD':
      newstate = {...state}
      newstate.good++
      return newstate
    case 'OK':
      newstate = {...state}
      newstate.ok++
      return newstate
    case 'BAD':
      newstate = {...state}
      newstate.bad++
      return newstate
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer