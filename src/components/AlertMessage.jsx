import PropTypes from 'prop-types';

function AlertMessage(props) {
  return (
    <>
      <div className='alert alert-success alert-dismissible fade show' role='alert' style={{
        position: 'fixed',
        top: '20px',
        right: '14px',
        width: '20rem',
        zIndex: '1050',
        boxShadow: '0px 4px 10px rgba(0,0,0,0.1)'
      }}>
        {props.messageValue}
        <button type='button' className='btn-close' data-bs-dismiss="alert" aria-label="Close" onClick={props.onClose}></button>
      </div>
    </>
  )
}

AlertMessage.propTypes = {
  messageValue: PropTypes.string.isRequired,  // Make this required since it's essential for the alert
  onClose: PropTypes.func.isRequired          // Also make onClose required
}

export default AlertMessage;
