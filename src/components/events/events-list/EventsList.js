import React from "react";
import EventsListItem from "../events-list-item/EventsListItem";
import "./EventsList.css";
import PropTypes from "prop-types";

function EventsList({events}) {
  console.log(events);
  return (
    <ul className="eventsList">
      {events.map(event => {
        return <EventsListItem event={event} key={event.id} />;
      })}
    </ul>
  );
}

EventsList.propTypes = {
    event: PropTypes.array,
    deleteEvent: PropTypes.func
}

export default EventsList