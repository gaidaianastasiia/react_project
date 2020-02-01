import React from "react";
import "./CloseBtn.css";

const CloseBtn = ({ onCloseBtnClick }) => (
  <button className={"close-btn"} onClick={onCloseBtnClick}>
    X
  </button>
);

export default CloseBtn;
