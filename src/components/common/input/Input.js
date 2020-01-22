import React from "react";
import PropTypes from 'prop-types';
import "./Input.css"

const Input = ({type, name, value, onChange, labelText, errorMessage}) => {
    const controlClassName = {
        text: "input__control_default",
        email: "input__control_default",
        password: "input__control_default",
        number: "input__control_default",
        file: "input__control_file",
        date: "input__control_date",
        radio: "input__control_radio",
        checkbox: "input__control_checkbox",
    };

    return (
        <div className="input">
            <label className="input__label">
                {labelText}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`${controlClassName[type]} ${errorMessage && 'input__invalid'}`}
                />
            </label>
            {errorMessage && <span className="input__error">{errorMessage}</span>}
        </div>)
};

Input.propTypes = {
    type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'file', 'date', 'radio', 'checkbox']),
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    labelText: PropTypes.string,
    errorMessage: PropTypes.string,
};

Input.defaultProps = {
    type: "text",
    name: "",
    value: "",
    onChange: () => {
    },
    labelText: "",
    errorMessage: "",
};

export default Input;