import React, { Component } from "react";
import EventsList from "./events-list/EventsList";
import Button from "../common/button/Button";
import EventsModal from "./events-modal/EventsModal";

const events = [
  {
    id: 1,
    title: "event 1",
    description: "awesome 1 event",
    date: "22 febuary",
    timeStart: "12:20",
    timeEnd: "16:00"
  },
  {
    id: 2,
    title: "event 2",
    description: "awesome 2 event",
    date: "12 january",
    timeStart: "15:50",
    timeEnd: "18:00"
  },
  {
    id: 3,
    title: "event 3",
    description: "awesome 3 event",
    date: "25 march",
    timeStart: "11:20",
    timeEnd: "14:00"
  },
  {
    id: 4,
    title: "event 4",
    description: "awesome 4 event",
    date: "17 june",
    timeStart: "16:20",
    timeEnd: "19:00"
  }
];

export default class Events extends Component {
  state = {
    id: "",
    title: "",
    date: "",
    timeStart: "",
    timeFinish: "",
    isFullDay: false,
    isModalOpen: false
  };

  showModal() {
    this.setState({ isModalOpen: true });
  }
  hideModal() {
    this.setState({ isModalOpen: false });
  }

  submitHandler(event){
    event.preventDefault();
    console.log("work")

  }

  render() {
    return (
      <React.Fragment>
        <Button
          type="button"
          children="Add event"
          theme="primary"
          size="large"
          onClick={() => this.showModal()}
        />
        <EventsList events={events}  />
        {this.state.isModalOpen && (
          <EventsModal  hideModal={() => this.hideModal()} submitHandler = {this.submitHandler} />
        )}
      </React.Fragment>
    );
  }
}
