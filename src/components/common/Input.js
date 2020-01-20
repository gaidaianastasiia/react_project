import React from "react";
import PropTypes from 'prop-types';

const Input = ({className, value, name, type, placeholder, onChange, errorMessage}) => (
    <div className = {className}>
        <input
            value = {value}
            name = {name}
            type = {type}
            placeholder={placeholder}
            onChange={onChange}
        />

        <span>{errorMessage}</span>
    </div>
);

Input.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    errorMessage: PropTypes.string
};

Input.defaultProps = {
    className: "",
    value: "",
    name: "",
    type: "text",
    placeholder: "",
    onChange: () => {},
    errorMessage: ""
};

export default Input;