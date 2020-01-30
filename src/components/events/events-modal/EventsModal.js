import React, { Component } from "react";
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import Textarea from "../../common/textarea/Textarea";
import "./EventsModal.css";
import ValidationService from "../../../services/ValidationService";
export default class EventsModal extends Component {
  constructor(props) {
    super();
    this.validateService = new ValidationService();
    this.updetingEvent = props.event;
    this.validateService = new ValidationService();
  }

  state = {
    name: "",
    date: "",
    description: "",
    start_time: "",
    end_time: "",
    full_day: false,
    disabled: false,
    errorMessage: ""
  };

  componentDidMount = () => {
    if (this.updetingEvent) {
      const {
        name,
        date,
        description,
        start_time,
        end_time,
        errorMessage,
        full_day
      } = this.updetingEvent;
      this.setState({
        ...this.state,
        name,
        date,
        errorMessage,
        description,
        start_time,
        end_time,
        full_day
      });
    }
    console.log(this.state);
    console.log(this.props);
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
    let event;
    if (this.updetingEvent) {
      event = this.createEvent(this.updetingEvent.id);
    } else {
      event = this.createEvent(Date.now());
    }

    
    const eventsInput = this.validateService.validateEventsInput(event);
    if (eventsInput.isValid) {
      this.updetingEvent = null;
      this.props.handleSubmit(event);
    }
    else{
      this.setState({
        ...this.state,
        errorMessage: eventsInput.errMessage
      })
    }
    console.log(event)
  };

  createEvent = id => {
    const {
      name,
      date,
      description,
      start_time,
      end_time,
      full_day
    } = this.state;
    return { name, date, description, start_time, end_time, full_day, id };
  };

  render() {
    const {
      name,
      date,
      description,
      start_time,
      end_time,
      full_day,
      errorMessage,
      disabled
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
            errorMessage={errorMessage}
          />
          <Textarea
            name={"description"}
            value={description}
            onChange={this.handleInputChange}
            labelText={"Description"}
            errorMessage={errorMessage}
          />
          <Input
            type={"date"}
            name={"date"}
            value={date}
            onChange={this.handleInputChange}
            labelText={"Date"}
            errorMessage={errorMessage}
          />
          <Input
            type={"time"}
            name={"start_time"}
            value={start_time}
            onChange={this.handleInputChange}
            labelText={"Start Time"}
            disabled={disabled}
            errorMessage={errorMessage}
          />
          <Input
            type={"time"}
            name={"end_time"}
            value={end_time}
            onChange={this.handleInputChange}
            labelText={"End Time"}
            disabled={disabled}
            errorMessage={errorMessage}
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
