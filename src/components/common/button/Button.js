import React from "react";
import PropTypes from "prop-types";

const Button = ({type, theme, size, onClick, children}) => {
  const btnThemes = {
    primary: "btn_primary",
    light: "btn_light",
    control: "btn_control"
  };

  const btnSizes = {
    auto: "btn_size-auto",
    small: "btn_size-small",
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
  theme: PropTypes.oneOf(["primary", "light", "control"]),
  size: PropTypes.oneOf(["auto", "small", "medium", "large"]),
  onClick: PropTypes.func
};

Button.defaultProps = {
  type: "button",
  theme: "primary",
  size: "medium",
  onClick: () => {
  }
};

export default Button;