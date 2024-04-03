
import PropTypes from 'prop-types';

function AlertMessage(props) {
  return (
    <>
      <div className='alert alert-primary alert-dismissible fade show' role='alert'> 
        {props.children} 
        <button type='button' className='btn-close' data-bs-dismiss="alert" aria-label="Close" onClick={props.onClose}></button>
      </div>
    </>
  )
}

AlertMessage.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func
}

export default AlertMessage
