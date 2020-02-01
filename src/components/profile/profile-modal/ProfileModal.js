import React, { Component } from "react";
import ValidationService from "../../../services/ValidationService";
import Button from "../../common/button/Button";
import Input from "../../common/input/Input";
import "./ProfileModal.css";

export default class ProfileModal extends Component {
  constructor(props) {
    super();
    this.validationService = new ValidationService();
  }

  state = {
    prevPass: "",
    newPass: "",
    confNewPass: "",
    prevPassErrMessage: "",
    newPassErrMessage: "",
    confPassErrMessage: ""
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  submit = e => {
    e.preventDefault();

    const { prevPass, newPass, confNewPass } = this.state;
    const prevPassValidData = this.validationService.validatePassword(prevPass);
    const newPassValidData = this.validationService.validatePassword(newPass);
    const passwordsValidData = this.validationService.validatePasswordsMatch(newPass, confNewPass);

    if (prevPassValidData.isValid && newPassValidData.isValid && passwordsValidData.isValid) {
      this.props.handleChangePassSubmit(prevPass, newPass);
    } else {
      this.setState({
        ...this.state,
        prevPassErrMessage: prevPassValidData.errMessage,
        newPassErrMessage: newPassValidData.errMessage,
        confPassErrMessage: passwordsValidData.errMessage
      });
    }
  };

  render() {
    const { handleCloseBtnClick } = this.props;
    const { prevPass, newPass, confNewPass, prevPassErrMessage, newPassErrMessage, confPassErrMessage } = this.state;

    return (
      <div className={"modal"}>
        <form className={"moda__form"}>
          <div className="modal__close-btn">
            <Button theme={"light"} size={"auto"} onClick={handleCloseBtnClick}>
              X
            </Button>
          </div>
          <Input type={"password"} name={"prevPass"} value={prevPass} onChange={this.handleInputChange} labelText={"Previous password"} errorMessage={prevPassErrMessage} />
          <Input type={"password"} name={"newPass"} value={newPass} onChange={this.handleInputChange} labelText={"New password"} errorMessage={newPassErrMessage} />
          <Input type={"password"} name={"confNewPass"} value={confNewPass} onChange={this.handleInputChange} labelText={"Enter your new password again for verification"} errorMessage={confPassErrMessage} />
          <Button type={"submit"} onClick={this.submit}>
            Cnange
          </Button>
        </form>
      </div>
    );
  }
}
