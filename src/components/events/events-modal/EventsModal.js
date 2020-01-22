import React, { Component } from "react";
import "./EventsModal.css";
import Input from "../../common/input/Input";
import Textarea from "../../common/textarea/Textarea";
import Button from "../../common/button/Button";

export default class EventsModal extends Component {
  render() {
    return (
      <div className="modal">
        <div className="modal-header">
          <h1>Add event</h1>
          <Button
            children="&times;"
            size="extraSmall"
            type="button"
            onClick={() => {
              this.props.hideModal();
            }}
          />
        </div>
        <form onSubmit={this.props.submitHandler}>
          <Input
            className="text"
            type="text"
            labelText="Enter the title"
            onChange={() => console.log("dasdas")}
            value={this.value}
          />
          <Textarea
            onChange={() => console.log("dsadsa")}
            value=""
            labelText="Enter the description"
          />
          <Input
            type="time"
            className="date"
            labelText="Enter the start time of the event"
            onChange={() => console.log("sds")}
          />
          <Input
            type="time"
            className="date"
            labelText="Enter the end time of the event"
            onChange={() => console.log("sdasd")}
          />
          <Input
            type="checkbox"
            labelText="Is full day"
            className="checkbox"
            onChange={() => console.log("check")}
          />
          <Button
            type="submit"
            children="Publicate"
            theme="primary"
            size="medium"
          />
        </form>
      </div>
    );
  }
}
