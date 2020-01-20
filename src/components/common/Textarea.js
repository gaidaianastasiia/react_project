import React from "react";
import PropTypes from 'prop-types';

const Textarea = ({className, value, name, placeholder, onChange, errorMessage}) => (
    <div className = {className}>
        <textarea
            value={value}
            name = {name}
            placeholder={placeholder}
            onChange={onChange}
        />

        <span>{errorMessage}</span>
    </div>
);

Textarea.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    errorMessage: PropTypes.string
};

Textarea.defaultProps = {
    className: "",
    value: "",
    name: "",
    placeholder: "",
    onChange: () => {},
    errorMessage: ""
};

export default Textarea;