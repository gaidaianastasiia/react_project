import React from "react";
import PropTypes from 'prop-types';

const Button = ({className, onClick, children}) => <button className={className} onClick={onClick}>{children}</button>;

Button.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func
};

Button.defaultProps = {
    className: "",
    onClick: () => {}
};

export default Button;