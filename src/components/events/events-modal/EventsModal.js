import React, { Component } from "react";
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import "./EventsModal.css";

export default class EventsModal extends Component {
  constructor(props) {
    super();
    this.updetingEvent = props.event;
  }

  state = {
    name: "",
    date: "",
    start_time: "",
    end_time: "",
    full_day: false,
    disabled: false
  };

  componentDidMount = () => {
    if (this.updetingEvent) {
      const { name, date, start_time, end_time, full_day } = this.updetingEvent;
      this.setState({
        ...this.state,
        name,
        date,
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

  handleSubmit = () => {
    let event;

    if (this.updetingEvent) {
      event = this.createEvent(this.updetingEvent.id);
    } else {
      event = this.createEvent(Date.now());
    }

    this.updetingEvent = null;
    this.props.handleSubmit(event);
  };

  createEvent = id => {
    const { name, date, start_time, end_time, full_day } = this.state;
    return { name, date, start_time, end_time, full_day, id };
  };

  render() {
    const { name, date, start_time, end_time, full_day, disabled } = this.state;
    const { handleCloseBtnClick } = this.props;

    return (
      <div className={"modal"}>
        <div className={"modal__content"}>
          <div className="modal__close">
            <Button theme={"light"} size={"auto"} onClick={handleCloseBtnClick}>
              X
            </Button>
          </div>
          <Input
            name={"name"}
            value={name}
            onChange={this.handleInputChange}
            labelText={"Name"}
          />
          <Input
            type={"date"}
            name={"date"}
            value={date}
            onChange={this.handleInputChange}
            labelText={"Date"}
          />
          <Input
            type={"time"}
            name={"start_time"}
            value={start_time}
            onChange={this.handleInputChange}
            labelText={"Start Time"}
            disabled={disabled}
          />
          <Input
            type={"time"}
            name={"end_time"}
            value={end_time}
            onChange={this.handleInputChange}
            labelText={"End Time"}
            disabled={disabled}
          />
          <Input
            type={"checkbox"}
            name={"full_day"}
            isChecked={full_day}
            onChange={this.handleCheckboxChange}
            labelText={"Full Day Event"}
          />
          <Button onClick={this.handleSubmit}>Save</Button>
        </div>
      </div>
    );
  }
}
