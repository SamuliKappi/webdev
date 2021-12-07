import React from 'react'
import { connect } from 'react-redux'
import { change } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    props.change(event.target.value)
    // input-field value is in variable event.target.value
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapStateToProp = (state) => {
  return {
    filter: state.filter
  }
}
const mapDispatchToProp = {
  change
}
const ConnectedFilter = connect(mapStateToProp, mapDispatchToProp)(Filter)
export default ConnectedFilter