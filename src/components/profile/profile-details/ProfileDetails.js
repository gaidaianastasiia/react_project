import React, { Component } from "react";
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import AuthService from "../../../services/AuthService";

export default class ProfileDetails extends Component {
  constructor() {
    super();
    this.authService = new AuthService();
    this.currentUser = this.authService.getCurrentUser();
  }

  state = {
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    gender: ""
  };

  componentDidMount() {
    const { first_name, last_name, email, age, gender } = this.currentUser;

    this.setState({
      ...this.state,
      first_name,
      last_name,
      email,
      age,
      gender
    });
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  handleSubmit = () => {
    const { first_name, last_name, email, age, gender } = this.state;

    const updatedData = {
      first_name,
      last_name,
      email,
      age,
      gender,
      role: this.currentUser.role
    };

    this.props.handleUpdateSubmit(updatedData);
  };

  render() {
    const { first_name, last_name, email, age, gender } = this.state;
    const { handleChangePassBtnClick } = this.props;

    return (
      <form className="profile__form">
        <Input name={"first_name"} value={first_name} onChange={this.handleInputChange} labelText={"First Name"} />
        <Input name={"last_name"} value={last_name} onChange={this.handleInputChange} labelText={"Last Name"} />
        <Input type={"email"} name={"email"} value={email} onChange={this.handleInputChange} labelText={"Email"} />
        <Input type={"number"} name={"age"} value={age} onChange={this.handleInputChange} labelText={"Age"} />
        <div className="profile__gender">
          <p>Gender</p>
          <div className="profile__gender-controls">
            <Input type={"radio"} name={"gender"} value={"male"} isChecked={gender === "male"} onChange={this.handleInputChange} labelText={"Male:"} />
            <Input type={"radio"} name={"gender"} value={"female"} isChecked={gender === "female"} onChange={this.handleInputChange} labelText={"Female:"} />
          </div>
        </div>
        <p className="profile__change-pass">
          <Button theme={"light"} onClick={handleChangePassBtnClick}>
            Change Password
          </Button>
        </p>
        <Button size={"large"} onClick={this.handleSubmit}>
          Update
        </Button>
      </form>
    );
  }
}
