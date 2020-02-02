import React, { Component } from "react";
import EventsListItem from "./EventsListItem";

export default class EventsList extends Component {
  render() {
    const { events } = this.props;
    return (
      <ul className="events__list">
        {events.map(event => (
          <EventsListItem key={event.id} event={event} />
        ))}
      </ul>
      
    );
    
  }
}
