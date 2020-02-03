import React from "react";
import PropTypes from 'prop-types';

const Textarea = ({value, name, rows, onChange, labelText, errorMessage}) => (
  <div className="textarea">
    <label className="textarea__label">
      {labelText}
      <textarea value={value} name={name} rows={rows} onChange={onChange} className={`textarea__control ${errorMessage && 'textarea__invalid'}`}/>
    </label>
    {errorMessage && <span className="textarea__error">{errorMessage}</span>}
  </div>
);

Textarea.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  rows: PropTypes.string,
  onChange: PropTypes.func,
  labelText: PropTypes.string,
  errorMessage: PropTypes.string
};

Textarea.defaultProps = {
  value: "",
  name: "",
  rows: "4",
  onChange: () => {
  },
  labelText: "",
  errorMessage: ""
};

export default Textarea;