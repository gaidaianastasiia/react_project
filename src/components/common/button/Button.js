import React from "react";
import PropTypes from 'prop-types';
import "./Button.css";

const Button = ({type, theme, size, onClick, children}) => {
    const btnThemes = {
        primary: 'btn_primary', // темы кнопки могут дополняться
    };

    const btnSizes = {
        small: 'btn_size-small', //размеры кнопки могут дополняться
        medium: 'btn_size-medium',
        large: 'btn_size-large',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`btn ${btnThemes[theme]} ${btnSizes[size]}`}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    theme: PropTypes.oneOf(['primary']), // темы кнопки могут дополняться
    size: PropTypes.oneOf(['small', 'medium', 'large']), //размеры кнопки могут дополняться
    onClick: PropTypes.func
};

Button.defaultProps = {
    type: 'button',
    theme: 'primary',
    size: 'medium',
    onClick: () => {}
};

export default Button;