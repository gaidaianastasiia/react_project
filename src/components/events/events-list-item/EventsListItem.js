import React from "react";
import Button from "../../common/button/Button";
import PropTypes from 'prop-types';

function EventsListItem({event}) {
    console.log(event)
  return (
    <li>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>Date: {event.date}</p>
      <p>Start {event.timeStart}</p>
      <p>End {event.timeEnd}</p>
      <Button
        children="Update"
        size="small"
        type="button"
        onClick={() =>console.log(event.id)}
      />
      <Button
        children="Delete"
        size="small"
        type="button"
        onClick={() => console.log(event.id)}
      />
    </li>
  );
}

EventsListItem.propTypes = {
    event: PropTypes.object,


}

export default EventsListItem;
