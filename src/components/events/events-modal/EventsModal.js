import React, { Component } from "react";
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import Textarea from "../../common/textarea/Textarea";
import "./EventsModal.css";
import ValidationService from "../../../services/ValidationService";

export default class EventsModal extends Component {
  constructor(props) {
    super();
    this.updetingEvent = props.event;
    this.validationService = new ValidationService();
  }

  state = {
    name: "",
    date: "",
    start_time: "",
    end_time: "",
    full_day: false,
    disabled: false,
    description: "",
    NameError: "",
    DescriptionError: "",
    DateError: "",
    TimeError: "",
  };

  componentDidMount = () => {
    if (this.updetingEvent) {
      const {
        name,
        date,
        description,
        start_time,
        end_time,
        full_day
      } = this.updetingEvent;
      this.setState({
        ...this.state,
        name,
        date,
        description,
        start_time,
        end_time,
        full_day
      });
    }
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  handleCheckboxChange = ({ target: { checked } }) => {
    this.setState({
      ...this.props,
      start_time: "",
      end_time: "",
      disabled: checked,
      full_day: checked
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      name,
      date,
      description,
      start_time,
      end_time,
      full_day
    } = this.state;
    // this.props.handleSubmit({
    //   name,
    //   date,
    //   description,
    //   start_time,
    //   end_time,
    //   full_day,

    // });
    const NameValidData = this.validationService.validateTextField(name);
    const DescriptionValidData = this.validationService.validateTextField(
      description
    );
    const DateValidData = this.validationService.validationDate(date);
    const TimeValidateData = this.validationService.validateTime(
      start_time,
      end_time,
      full_day
    );
    if (
      NameValidData.isValid &&
      DescriptionValidData.isValid &&
      DateValidData.isValid &&
      TimeValidateData.isValid
    ) {
      this.props.handleSubmit({
        name,
        description,
        date,
        start_time,
        end_time,
        full_day
      });
    } else {
      this.setState({
        ...this.state,
        NameError: NameValidData.errMessage,
        DescriptionError: DescriptionValidData.errMessage,
        DateError: DateValidData.errMessage,
        TimeError: TimeValidateData.errMessage
      });
    }
  };

  render() {
    const {
      name,
      date,
      description,
      start_time,
      end_time,
      full_day,
      disabled,
      NameError,
      DescriptionError,
      DateError,
      TimeError,
    } = this.state;
    const { handleCloseBtnClick } = this.props;
    return (
      <div className={"modal"}>
        <form className="moda__form">
          <div className="modal__close-btn">
            <Button theme={"light"} size={"auto"} onClick={handleCloseBtnClick}>
              X
            </Button>
          </div>
          <Input
            name={"name"}
            value={name}
            onChange={this.handleInputChange}
            labelText={"Name"}
            errorMessage={NameError}
          />
          <Textarea
            name={"description"}
            value={description}
            type={"text"}
            onChange={this.handleInputChange}
            labelText={"Description"}
            errorMessage={DescriptionError}
          />
          <Input
            type={"date"}
            name={"date"}
            value={date}
            onChange={this.handleInputChange}
            labelText={"Date"}
            errorMessage={DateError}
          />
          <Input
            type={"time"}
            name={"start_time"}
            value={start_time}
            onChange={this.handleInputChange}
            labelText={"Start Time"}
            disabled={disabled}
            errorMessage={TimeError}
          />
          <Input
            type={"time"}
            name={"end_time"}
            value={end_time}
            onChange={this.handleInputChange}
            labelText={"End Time"}
            disabled={disabled}
            errorMessage={TimeError}
          />
          <Input
            type={"checkbox"}
            name={"full_day"}
            isChecked={full_day}
            onChange={this.handleCheckboxChange}
            labelText={"Full Day Event"}
          />

          <Button type={"submit"} onClick={this.handleSubmit}>
            Save
          </Button>
        </form>
      </div>
    );
  }
}
