import React, { Component } from "react";
import EventsListItem from "../events-list-item/EventsListItem";

export default class EventsList extends Component {
  render() {
    const { events } = this.props;

    return (
      <ul>
        {events.map(event => (
          <EventsListItem key={event.id} event={event} />
        ))}
      </ul>
    );
  }
}
