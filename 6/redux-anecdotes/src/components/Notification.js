import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: props.notification.status
  }
  return (
    <div style={{...style}} >
      {props.notification.text}
    </div>
  )
}
const mapStateToProp = (state) => {
  return {
    notification: state.notification
  }
}
const ConnectedNotification = connect(mapStateToProp)(Notification)
export default ConnectedNotification