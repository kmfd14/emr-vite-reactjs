import PropTypes from 'prop-types';

function AlertButton(props) {
  return (
    <>
      <button className={'btn btn-' + props.color} onClick={props.onClick}>Alert Button</button>
    </>
  );
}

AlertButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'])
}

export default AlertButton;
