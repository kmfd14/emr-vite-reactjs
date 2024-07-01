import PropTypes from 'prop-types'

function Message(props) {
  // const message = "This is from Message.jsx file."
  return (
    <>
      <h4>{props.message}</h4>
    </>
  )
}

Message.propTypes = {
  message: PropTypes.string
}

export default Message
