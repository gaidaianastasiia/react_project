import React from "react";
import PropTypes from "prop-types";

const Input = ({ type, name, value, disabled, onChange, isChecked, labelText, errorMessage }) => {
    const controlClassName = {
        text: "input__control_default",
        email: "input__control_default",
        password: "input__control_default",
        number: "input__control_default",
        file: "input__control_file",
        date: "input__control_date",
        time: "input__control_time",
        radio: "input__control_radio",
        checkbox: "input__control_checkbox"
    };

    return (
        <div className="input">
            <label className="input__label">
                {labelText}
                <input type={type} name={name} value={value} disabled={disabled} onChange={onChange} checked={isChecked} className={`${controlClassName[type]} ${errorMessage && "input__invalid"}`} />
            </label>
            {errorMessage && <span className="input__error">{errorMessage}</span>}
        </div>
    );
};

Input.propTypes = {
    type: PropTypes.oneOf(["text", "email", "password", "number", "file", "date", "time", "radio", "checkbox"]),
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
    disabled: PropTypes.bool,
    isChecked: PropTypes.bool,
    onChange: PropTypes.func,
    labelText: PropTypes.string,
    errorMessage: PropTypes.string
};

Input.defaultProps = {
    type: "text",
    name: "",
    value: "",
    disabled: false,
    isChecked: false,
    onChange: () => {},
    labelText: "",
    errorMessage: ""
};

export default Input;
