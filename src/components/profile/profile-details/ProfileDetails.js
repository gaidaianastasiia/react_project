import React, { Component } from "react";
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";

export default class ProfileDetails extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    age: 0,
    gender: ""
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  render() {
    const { first_name, last_name, email, age, gender } = this.state;
    const {
      handleChangePassBtnClick,
      handleChangeNameCurrentUSer
    } = this.props;

    return (
      <form className="profile__form">
        <Input
          name={"first_name"}
          value={first_name}
          onChange={this.handleInputChange}
          labelText={"First Name"}
        />
        <Input
          name={"last_name"}
          value={last_name}
          onChange={this.handleInputChange}
          labelText={"Last Name"}
        />
        <Input
          type={"email"}
          name={"email"}
          value={email}
          onChange={this.handleInputChange}
          labelText={"Email"}
        />
        <Input
          type={"number"}
          name={"age"}
          value={age}
          onChange={this.handleInputChange}
          labelText={"Age"}
        />
        <div className="profile__gender">
          <p>Gender</p>
          <div className="profile__gender-controls">
            <Input
              type={"radio"}
              name={"gender"}
              value={"male"}
              isChecked={gender === "male"}
              onChange={this.handleInputChange}
              labelText={"Male:"}
            />
            <Input
              type={"radio"}
              name={"gender"}
              value={"female"}
              isChecked={gender === "female"}
              onChange={this.handleInputChange}
              labelText={"Female:"}
            />
          </div>
        </div>
        <p className="profile__change-pass">
          <Button theme={"light"} onClick={handleChangePassBtnClick}>
            Change Password
          </Button>
        </p>
        <Button size={"large"} onClick={handleChangeNameCurrentUSer}>
          Update
        </Button>
      </form>
    );
  }
}
