import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const Button = ({ type, theme, size, onClick, children }) => {
  const btnThemes = {
    primary: "btn_primary", // темы кнопки могут дополняться
    light: "btn_light"
  };

  const btnSizes = {
    auto: "btn_size-auto",
    small: "btn_size-small", //размеры кнопки могут дополняться
    medium: "btn_size-medium",
    large: "btn_size-large"
  };

  return (
    <button type={type} onClick={onClick} className={`btn ${btnThemes[theme]} ${btnSizes[size]}`}>
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  theme: PropTypes.oneOf(["primary", "light"]),
  size: PropTypes.oneOf(["auto", "small", "medium", "large"]), //размеры кнопки могут дополняться
  onClick: PropTypes.func
};

Button.defaultProps = {
  type: "button",
  theme: "primary",
  size: "medium",
  onClick: () => {}
};

export default Button;
